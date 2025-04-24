import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import {
  EOrderStatus,
  EPaymentMethod,
  EPaymentStatus,
} from 'src/common/constants/order.enum';
import { ERole } from 'src/common/constants/role.enum';
import { ETableName } from 'src/common/constants/table-name.enum';
import { UserParams } from 'src/common/decorators/user.decorator';
import { Order } from 'src/database/entities/order.entity';
import { TypeOrmBaseService } from 'src/database/services/typeorm-base.service';
import { DataSource, FindOptionsWhere, In, Repository } from 'typeorm';
import { PaymentsService } from '../payments/payments.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderPaginationDto } from './dto/order-pagination.dto';
import { instanceToPlain } from 'class-transformer';
import { OrderStatusLogsService } from '../order-status-logs/order-status-logs.service';

@Injectable()
export class OrdersService extends TypeOrmBaseService<Order> {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    @Inject(forwardRef(() => PaymentsService))
    private readonly paymentsService: PaymentsService,
    private readonly orderStatusLogsService: OrderStatusLogsService,
    private readonly dataSource: DataSource,
  ) {
    super(ordersRepository);
  }

  async create(user: UserParams, createOrderDto: CreateOrderDto) {
    const {
      discount,
      paymentMethod,
      shippingMethod,
      shippingPrice,
      subTotal,
      totalPrice,
      vat,
      addressId,
      cartItemIds,
    } = createOrderDto;

    const txnRef = dayjs().format('HHmmss');

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const [cartItems, address] = await Promise.all([
        queryRunner.manager.find(ETableName.CART_ITEM, {
          where: {
            id: In(cartItemIds),
            user: { id: user.id },
            isDeleted: false,
          },
          relations: ['product'],
        }) as any,
        queryRunner.manager.findOneOrFail(ETableName.ADDRESS, {
          where: { id: addressId, user: { id: user.id } },
        }),
      ]);
      const order = (await queryRunner.manager.save(
        this.ordersRepository.create({
          address: instanceToPlain(address),
          vat,
          discount,
          paymentMethod,
          shippingMethod,
          shippingPrice,
          subTotal,
          totalPrice,
          user: { id: user.id },
          createdBy: user.email,
          txnRef,
          cart: instanceToPlain(cartItems),
          status:
            paymentMethod === EPaymentMethod.COD
              ? EOrderStatus.PENDING
              : EOrderStatus.DRAFT,
        } as any),
      )) as any;

      await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into(ETableName.ORDER_ITEM)
        .values(
          cartItems.map(
            (item) =>
              ({
                order: { id: order.id },
                product: item.product,
                quantity: item.quantity,
                price: item.product.price,
                createdBy: user.email,
              }) as any,
          ),
        )
        .execute();

      if (paymentMethod === EPaymentMethod.COD) {
        await queryRunner.manager.update(
          ETableName.CART_ITEM,
          { user: { id: user.id }, id: In(cartItemIds), isDeleted: false },
          { isDeleted: true },
        );
      }

      await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into(ETableName.PAYMENT)
        .values({
          order: { id: order.id },
          user: { id: user.id },
          totalPrice,
          transactionId:
            paymentMethod === EPaymentMethod.COD
              ? `${order.id}${Date.now()}`
              : null,
          createdBy: user.email,
          bank: null,
          cardType: null,
          status: EPaymentStatus.PENDING,
        })
        .execute();

      await queryRunner.commitTransaction();

      const res = {
        msg: 'Create order successfully',
        data: { ...order, orderItems: cartItems },
      };

      if (paymentMethod === EPaymentMethod.PAYMENT_GATEWAY) {
        const redirectUrl = await this.paymentsService.generateUrl({
          txnRef,
          ipAddress: user.ip,
          orderInfo: `${user?.firstName + user.lastName} chuyển khoản ${totalPrice} cho đơn hàng #${order?.id}`,
          totalPrice,
        });
        return { ...res, redirectUrl };
      }
      return res;
    } catch (error) {
      if (queryRunner.isTransactionActive) {
        await queryRunner.rollbackTransaction();
      }
      throw new Error(`Failed to create order: ${error.message}`);
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(args: OrderPaginationDto, user?: UserParams) {
    const { limit, page, sortBy, sort, txnRef, status, orderId, productTitle } =
      args;

    const queryBuilder = this.ordersRepository
      .createQueryBuilder(this.entityName)
      .leftJoinAndSelect(`${this.entityName}.user`, 'user')
      .leftJoinAndSelect(`${this.entityName}.orderItems`, 'orderItems');

    if (user?.id) {
      queryBuilder.andWhere(`${this.entityName}.userId = :userId`, {
        userId: user?.id,
      });
    }

    if (txnRef) {
      queryBuilder.andWhere(`${this.entityName}.txnRef = :txnRef`, {
        txnRef,
      });
    }

    if (status) {
      queryBuilder.andWhere(`${this.entityName}.status = :status`, {
        status,
      });
    }

    if (orderId) {
      queryBuilder.andWhere(`${this.entityName}.id = :id`, {
        id: orderId,
      });
    }

    if (productTitle) {
      queryBuilder.andWhere(
        `orderItems.product ->> 'title' ILIKE :productTitle`,
        {
          productTitle: `%${productTitle}%`,
        },
      );
    }

    const data = await this._findAll(queryBuilder, {
      limit,
      page,
      sort: {
        field: sortBy,
        order: sort,
      },
    });

    return {
      message: 'Get all successfully!!',
      data,
    };
  }

  removeVietnameseTones(str: string): string {
    return str
      .normalize('NFD') // tách dấu khỏi chữ
      .replace(/[\u0300-\u036f]/g, '') // xóa dấu
      .replace(/đ/g, 'd') // đ -> d
      .replace(/Đ/g, 'D') // Đ -> D
      .replace(/[^a-zA-Z0-9 ]/g, '') // bỏ kí tự đặc biệt (nếu cần)
      .trim();
  }

  async findOne(id: number, user?: UserParams) {
    const whereCondition: FindOptionsWhere<Order> =
      user.role === ERole.ADMIN ? { id } : { id, user: { id: user.id } };

    const order = await this._findOneOrFail({
      where: whereCondition,
      relations: ['user'],
    });

    return {
      data: instanceToPlain(order),
      message: 'Get Order Successfull!!',
    };
  }

  async findOrderTimeLine(id: number, user?: UserParams) {
    const allStatuses = Object.values(EOrderStatus);

    const rawResults = await this.orderStatusLogsService.repository
      .createQueryBuilder('log')
      .leftJoin('log.order', 'order')
      .leftJoin('order.user', 'user')
      .select('log.currentStatus', 'status')
      .addSelect('MAX(log.time)', 'latestTime')
      .where('log.orderId = :orderId', { orderId: id })
      .andWhere('user.id = :userId', { userId: user.id })
      .andWhere('log.isDeleted = false')
      .andWhere('log.currentStatus IN (:...statuses)', {
        statuses: allStatuses,
      })
      .groupBy('log.currentStatus')
      .getRawMany();
    const result: Record<EOrderStatus, { time: Date } | null> = {} as any;

    allStatuses.forEach((status) => {
      const matched = rawResults.find((row) => row.status === status);
      result[status] = matched ? matched.latestTime : null;
    });

    return {
      data: result,
      message: 'Get Order Timeline Successfull!!',
    };
  }

  update() {
    return `This action updates a order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}

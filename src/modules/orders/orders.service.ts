import { Injectable } from '@nestjs/common';
import { EPaymentMethod } from 'src/common/constants/order.enum';
import { ETableName } from 'src/common/constants/table-name.enum';
import { DataSource, In } from 'typeorm';
import { OrderPaginationDto } from './dto/address-pagination.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly dataSource: DataSource,
  ) {}

  async create(args: {
    cartItemIds: number[];
    shippingMethod: string;
    shippingPrice: number;
    paymentMethod: EPaymentMethod;
    discount: number;
    vat: number;
    subTotal: number;
    totalPrice: number;
    userId: number;
    userEmail: string;
    addressId: number;
    bank?: string;
    cardType?: string;
    transactionId?: string;
  }) {
    const {
      discount,
      paymentMethod,
      shippingMethod,
      shippingPrice,
      subTotal,
      totalPrice,
      userEmail,
      userId,
      vat,
      addressId,
      cartItemIds,
      bank,
      cardType,
      transactionId,
    } = args;

    const user = { id: userId, email: userEmail };

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const [cartItems, address] = await Promise.all([
        queryRunner.manager.find(ETableName.CART_ITEM, {
          where: {
            id: In(cartItemIds),
            user,
            isDeleted: false,
          },
          relations: ['product'],
        }) as any,
        queryRunner.manager.findOneOrFail(ETableName.ADDRESS, {
          where: { id: addressId, user },
        }),
      ]);
      const order = (await queryRunner.manager.save(
        this.ordersRepository.create({
          address,
          vat,
          discount,
          paymentMethod,
          shippingMethod,
          shippingPrice,
          subTotal,
          totalPrice,
          user: { id: userId },
          createdBy: userEmail,
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
                createdBy: userEmail,
              }) as any,
          ),
        )
        .execute();

      await queryRunner.manager.update(
        ETableName.CART_ITEM,
        { user: { id: userId }, id: In(cartItemIds), isDeleted: false },
        { isDeleted: true },
      );

      await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into(ETableName.PAYMENT)
        .values({
          order: { id: order.id },
          user: { id: userId },
          totalPrice,
          transactionId: transactionId || `COD-${order.id}-${Date.now()}`,
          createdBy: userEmail,
          bank,
          cardType,
        })
        .execute();

      await queryRunner.commitTransaction();

      return {
        msg: 'Create order successfully',
        data: { ...order, orderItems: cartItems },
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new Error(`Failed to create order: ${error.message}`);
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(args: OrderPaginationDto & { userId: number }) {
    const { limit, page, sortBy, sort, userId } = args;

    const queryBuilder = this.ordersRepository
      .createQueryBuilder(this.ordersRepository.entityName)
      .leftJoinAndSelect(`${this.ordersRepository.entityName}.user`, 'user')
      .leftJoinAndSelect(
        `${this.ordersRepository.entityName}.orderItems`,
        'orderItems',
      )
      .where(`${this.ordersRepository.entityName}.userId = :userId`, {
        userId,
      });

    const data = await this.ordersRepository._findAll(queryBuilder, {
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

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}

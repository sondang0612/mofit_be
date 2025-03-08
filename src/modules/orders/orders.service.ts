import { Injectable } from '@nestjs/common';
import { DataSource, In } from 'typeorm';
import { AddressesRepository } from '../addresses/addresses.repository';
import { CartItemsRepository } from '../cart-items/cart-items.repository';
import { OrderItemsRepository } from '../order-items/orders.repository';
import { OrderPaginationDto } from './dto/address-pagination.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly cartItemsRepository: CartItemsRepository,
    private readonly addressesRepository: AddressesRepository,
    private readonly orderItemsRepository: OrderItemsRepository,
    private readonly dataSource: DataSource,
  ) {}

  async create(args: {
    cartItemIds: number[];
    shippingMethod: string;
    shippingPrice: number;
    paymentMethod: string;
    discount: number;
    vat: number;
    subTotal: number;
    totalPrice: number;
    userId: number;
    userEmail: string;
    addressId: number;
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
    } = args;

    const user = { id: userId, email: userEmail };

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const [cartItems, address] = await Promise.all([
        this.cartItemsRepository.find({
          where: {
            id: In(cartItemIds),
            user,
            isDeleted: false,
          },
          relations: ['product'],
        }),
        this.addressesRepository._findOneOrFail({
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
        } as any),
      )) as any;

      await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into('order_items')
        .values(
          cartItems.map(
            (item) =>
              ({
                order: { id: order.id },
                product: item.product,
                quantity: item.quantity,
                price: item.product.price,
              }) as any,
          ),
        )
        .execute();

      await queryRunner.manager.update(
        'cart_items',
        { user: { id: userId }, id: In(cartItemIds), isDeleted: false },
        { isDeleted: true },
      );

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

import { Injectable, NotFoundException } from '@nestjs/common';
import { instanceToInstance } from 'class-transformer';
import { CartItemsRepository } from '../cart-items/cart-items.repository';
import { ProductsRepository } from '../products/products.repository';
import { CartRepository } from './cart.repository';
import { In } from 'typeorm';

@Injectable()
export class CartService {
  constructor(
    private cartItemsRepository: CartItemsRepository,
    private cartRepository: CartRepository,
    private productsRepository: ProductsRepository,
  ) {}

  async addToCart(args: {
    userId: number;
    productId: number;
    quantity: number;
  }) {
    const { userId, productId, quantity } = args;

    const cart = await this.cartRepository._findOrCreate(
      {
        where: { user: { id: userId } },
      },
      { user: { id: userId }, items: [] },
    );

    const product = await this.productsRepository._findOneOrFail({
      where: { id: productId },
    });

    let cartItem = await this.cartItemsRepository._findOne({
      where: { cart: { id: cart.id }, product: { id: product.id } },
    });

    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cartItem = this.cartItemsRepository.create({ cart, product, quantity });
    }

    await this.cartItemsRepository.save(cartItem);

    return {
      message: 'Add to cart successfully',
      data: undefined,
    };
  }

  async getCartInfo(args: { userId: number }) {
    const { userId } = args;

    const cart = await this.cartRepository
      .createQueryBuilder('cart')
      .leftJoinAndSelect(
        'cart.items',
        'items',
        'items.isDeleted = :isDeleted',
        { isDeleted: false },
      )
      .leftJoinAndSelect(
        'items.product',
        'product',
        'product.isDeleted = :isDeleted',
        { isDeleted: false },
      )
      .where('cart.user.id = :userId', { userId })
      .andWhere('cart.isDeleted = :isDeleted', { isDeleted: false })
      .getOne();

    return {
      message: 'List cart item successfully',
      data: instanceToInstance(cart),
    };
  }

  async removeCartItem(args: {
    cartItemIds: number[];
    userId: number;
    userEmail: string;
  }) {
    const { cartItemIds, userId, userEmail } = args;

    const cartItems = await this.cartItemsRepository.find({
      where: {
        id: In(cartItemIds),
        cart: { user: { id: userId } },
      },
    });

    if (cartItems.length === 0) {
      throw new NotFoundException('Not found cart item in cart to delete');
    }

    await this.cartItemsRepository._softDelete(cartItemIds, userEmail);

    return undefined;
  }
}

import { Injectable } from '@nestjs/common';
import { CartItemsRepository } from './cart-items.repository';

@Injectable()
export class CartItemsService {
  constructor(private readonly cartItemsRepository: CartItemsRepository) {}

  async remove(args: {
    userId: number;
    userEmail: string;
    cartItemId: number;
  }) {
    const { userId, userEmail, cartItemId } = args;

    const cartItem = await this.cartItemsRepository._findOneOrFail({
      where: {
        user: { id: userId, isDeleted: false, email: userEmail },
        id: cartItemId,
      },
    });

    await this.cartItemsRepository._softDelete(cartItem.id, userEmail);

    return null;
  }
  async create(args: {
    userId: number;
    userEmail: string;
    productId: number;
    quantity: number;
  }) {
    const { userId, productId, quantity, userEmail } = args;
    const cartItem = await this.cartItemsRepository._findOne({
      where: { user: { id: userId }, product: { id: productId } },
    });

    if (cartItem) {
      cartItem.quantity += quantity;
      await this.cartItemsRepository.save(cartItem);
    } else {
      await this.cartItemsRepository._create(
        {
          product: { id: productId },
          user: { id: userId },
          quantity,
        },
        { userEmail },
      );
    }

    return {
      message: 'Add to cart successfully',
    };
  }
}

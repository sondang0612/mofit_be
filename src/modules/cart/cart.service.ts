import { Injectable } from '@nestjs/common';
import { instanceToInstance } from 'class-transformer';
import { UsersRepository } from '../users/users.repository';
import { CartItemsRepository } from '../cart-items/cart-items.repository';

@Injectable()
export class CartService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly cartItemsRepository: CartItemsRepository,
  ) {}

  async getMyCart(args: { userId: number }) {
    const { userId } = args;

    const cartItems = await this.cartItemsRepository.find({
      where: { user: { id: userId, isDeleted: false }, isDeleted: false },
      relations: ['product'],
    });

    return {
      message: 'List cart items successfully',
      data: instanceToInstance(cartItems),
    };
  }
}

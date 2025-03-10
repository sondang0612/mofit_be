import { Injectable } from '@nestjs/common';
import { instanceToInstance } from 'class-transformer';
import { CartItemsService } from '../cart-items/cart-items.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class CartService {
  constructor(
    private readonly usersService: UsersService,
    private readonly cartItemsService: CartItemsService,
  ) {}

  async getMyCart(args: { userId: number }) {
    const { userId } = args;

    const cartItems = await this.cartItemsService.repository.find({
      where: { user: { id: userId, isDeleted: false }, isDeleted: false },
      relations: ['product'],
    });

    return {
      message: 'List cart items successfully',
      data: instanceToInstance(cartItems),
    };
  }
}

import { Injectable } from '@nestjs/common';
import { CartItemsRepository } from '../cart-items/cart-items.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly cartItemsRepository: CartItemsRepository,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository._create(createUserDto);
  }

  async addToCart(args: {
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
        { product: { id: productId }, user: { id: userId }, quantity },
        { userEmail },
      );
    }

    return {
      message: 'Add to cart successfully',
    };
  }
}

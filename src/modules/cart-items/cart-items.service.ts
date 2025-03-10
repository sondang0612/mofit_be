import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItem } from 'src/database/entities/cart-item.entity';
import { TypeOrmBaseService } from 'src/database/services/typeorm-base.service';
import { Repository } from 'typeorm';

@Injectable()
export class CartItemsService extends TypeOrmBaseService<CartItem> {
  constructor(
    @InjectRepository(CartItem)
    private readonly cartItemsRepository: Repository<CartItem>,
  ) {
    super(cartItemsRepository);
  }

  async remove(args: {
    userId: number;
    userEmail: string;
    cartItemId: number;
  }) {
    const { userId, userEmail, cartItemId } = args;

    const cartItem = await this._findOneOrFail({
      where: {
        user: { id: userId, isDeleted: false, email: userEmail },
        id: cartItemId,
      },
    });

    await this._softDelete(cartItem.id, userEmail);

    return null;
  }
  async create(args: {
    userId: number;
    userEmail: string;
    productId: number;
    quantity: number;
  }) {
    const { userId, productId, quantity, userEmail } = args;
    const cartItem = await this._findOne({
      where: { user: { id: userId }, product: { id: productId } },
    });

    if (cartItem) {
      cartItem.quantity += quantity;
      await this.cartItemsRepository.save(cartItem);
    } else {
      await this._create(
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

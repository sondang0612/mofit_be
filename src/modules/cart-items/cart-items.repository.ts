import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItem } from 'src/database/entities/cart-item.entity';
import { BaseRepository } from 'src/database/repositories/base.repository';
import { Repository } from 'typeorm';

@Injectable()
export class CartItemsRepository extends BaseRepository<CartItem> {
  constructor(@InjectRepository(CartItem) repository: Repository<CartItem>) {
    super(CartItem, repository);
  }
}

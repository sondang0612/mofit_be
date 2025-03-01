import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/database/entities/cart.entity';
import { BaseRepository } from 'src/database/repositories/base.repository';
import { Repository } from 'typeorm';

@Injectable()
export class CartRepository extends BaseRepository<Cart> {
  constructor(@InjectRepository(Cart) repository: Repository<Cart>) {
    super(Cart, repository);
  }
}

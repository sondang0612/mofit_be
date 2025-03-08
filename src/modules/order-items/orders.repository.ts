import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItem } from 'src/database/entities/order-item.entity';
import { BaseRepository } from 'src/database/repositories/base.repository';
import { Repository } from 'typeorm';

@Injectable()
export class OrderItemsRepository extends BaseRepository<OrderItem> {
  constructor(@InjectRepository(OrderItem) repository: Repository<OrderItem>) {
    super(OrderItem, repository);
  }
}

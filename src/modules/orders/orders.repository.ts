import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/database/entities/order.entity';
import { BaseRepository } from 'src/database/repositories/base.repository';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersRepository extends BaseRepository<Order> {
  constructor(@InjectRepository(Order) repository: Repository<Order>) {
    super(Order, repository);
  }
}

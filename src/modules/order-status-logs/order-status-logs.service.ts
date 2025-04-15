import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderStatusLog } from 'src/database/entities/order-status-log.entity';
import { TypeOrmBaseService } from 'src/database/services/typeorm-base.service';
import { Repository } from 'typeorm';

@Injectable()
export class OrderStatusLogsService extends TypeOrmBaseService<OrderStatusLog> {
  constructor(
    @InjectRepository(OrderStatusLog)
    private readonly orderStatusLogsRepository: Repository<OrderStatusLog>,
  ) {
    super(orderStatusLogsRepository);
  }

  create() {
    return 'This action adds a new orderItem';
  }
}

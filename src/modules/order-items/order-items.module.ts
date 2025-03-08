import { Module } from '@nestjs/common';
import { OrderItemsService } from './order-items.service';
import { OrderItemsController } from './order-items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from 'src/database/entities/order-item.entity';
import { OrderItemsRepository } from './orders.repository';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItem])],
  controllers: [OrderItemsController],
  providers: [OrderItemsService, OrderItemsRepository],
  exports: [OrderItemsRepository],
})
export class OrderItemsModule {}

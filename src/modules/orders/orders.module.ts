import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/database/entities/order.entity';
import { OrdersController } from './orders.controller';
import { OrdersRepository } from './orders.repository';
import { OrdersService } from './orders.service';
import { CartItem } from 'src/database/entities/cart-item.entity';
import { CartItemsModule } from '../cart-items/cart-items.module';
import { AddressesModule } from '../addresses/addresses.module';
import { Address } from 'src/database/entities/address.entity';
import { OrderItem } from 'src/database/entities/order-item.entity';
import { OrderItemsRepository } from '../order-items/orders.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, CartItem, Address, OrderItem]),
    CartItemsModule,
    AddressesModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository, OrderItemsRepository],
  exports: [OrdersRepository],
})
export class OrdersModule {}

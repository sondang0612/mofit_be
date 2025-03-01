import { Module } from '@nestjs/common';
import { CartItemsService } from './cart-items.service';
import { CartItemsController } from './cart-items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from 'src/database/entities/cart-item.entity';
import { CartItemsRepository } from './cart-items.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CartItem])],
  controllers: [CartItemsController],
  providers: [CartItemsService, CartItemsRepository],
  exports: [CartItemsRepository],
})
export class CartItemsModule {}

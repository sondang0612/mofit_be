import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from 'src/database/entities/cart-item.entity';
import { CartItemsController } from './cart-items.controller';
import { CartItemsRepository } from './cart-items.repository';
import { CartItemsService } from './cart-items.service';

@Module({
  imports: [TypeOrmModule.forFeature([CartItem])],
  controllers: [CartItemsController],
  providers: [CartItemsService, CartItemsRepository],
  exports: [CartItemsRepository],
})
export class CartItemsModule {}

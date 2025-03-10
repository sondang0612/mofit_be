import { Module } from '@nestjs/common';
import { CartItemsModule } from '../cart-items/cart-items.module';
import { UsersModule } from '../users/users.module';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';

@Module({
  imports: [UsersModule, CartItemsModule],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}

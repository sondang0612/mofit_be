import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { CartItem } from 'src/database/entities/cart-item.entity';
import { UsersModule } from '../users/users.module';
import { CartItemsModule } from '../cart-items/cart-items.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, CartItem]),
    UsersModule,
    CartItemsModule,
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}

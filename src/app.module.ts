import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attribute } from './database/entities/attribute.entity';
import { CartItem } from './database/entities/cart-item.entity';
import { Category } from './database/entities/category.entity';
import { Product } from './database/entities/product.entity';
import { User } from './database/entities/user.entity';
import { AttributesModule } from './modules/attributes/attributes.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtStrategy } from './modules/auth/strategies/jwt.strategy';
import { CartItemsModule } from './modules/cart-items/cart-items.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { MockDataModule } from './modules/mock-data/mock-data.module';
import { ProductsModule } from './modules/products/products.module';
import { UsersModule } from './modules/users/users.module';
import { CartModule } from './modules/cart/cart.module';
import { AddressesModule } from './modules/addresses/addresses.module';
import { Address } from './database/entities/address.entity';
import { OrdersModule } from './modules/orders/orders.module';
import { Order } from './database/entities/order.entity';
import { OrderItem } from './database/entities/order-item.entity';
import { OrderItemsModule } from './modules/order-items/order-items.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        Product,
        Category,
        Attribute,
        User,
        CartItem,
        Address,
        Order,
        OrderItem,
      ],
      synchronize: true,
    }),
    ProductsModule,
    CategoriesModule,
    MockDataModule,
    AttributesModule,
    UsersModule,
    AuthModule,
    CartItemsModule,
    CartModule,
    AddressesModule,
    OrdersModule,
    OrderItemsModule,
  ],
  providers: [JwtStrategy],
})
export class AppModule {}

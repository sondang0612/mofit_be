import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtGlobalModule } from './common/modules/jwt-global.module';
import { DatabaseModule } from './database/database.module';
import { AddressesModule } from './modules/addresses/addresses.module';
import { AttributesModule } from './modules/attributes/attributes.module';
import { AuthModule } from './modules/auth/auth.module';
import { GlobalAuthGuard } from './modules/auth/guards/global-auth.guard';
import { CartItemsModule } from './modules/cart-items/cart-items.module';
import { CartModule } from './modules/cart/cart.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { MockDataModule } from './modules/mock-data/mock-data.module';
import { OrderItemsModule } from './modules/order-items/order-items.module';
import { OrdersModule } from './modules/orders/orders.module';
import { PaymentTransactionModule } from './modules/payment-transaction/payment-transaction.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { ProductsModule } from './modules/products/products.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
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
    PaymentTransactionModule,
    PaymentsModule,
    JwtGlobalModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: GlobalAuthGuard }],
})
export class AppModule {}

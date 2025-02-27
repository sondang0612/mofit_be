import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './modules/products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './database/entities/product.entity';
import { CategoriesModule } from './modules/categories/categories.module';
import { Category } from './database/entities/category.entity';
import { MockDataModule } from './modules/mock-data/mock-data.module';
import { AttributesModule } from './modules/attributes/attributes.module';
import { Attribute } from './database/entities/attribute.entity';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';

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
      entities: [Product, Category, Attribute],
      synchronize: true,
    }),
    ProductsModule,
    CategoriesModule,
    MockDataModule,
    AttributesModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}

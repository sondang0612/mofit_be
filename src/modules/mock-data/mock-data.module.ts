import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attribute } from 'src/database/entities/attribute.entity';
import { Category } from 'src/database/entities/category.entity';
import { Product } from 'src/database/entities/product.entity';
import { AttributesModule } from '../attributes/attributes.module';
import { CategoriesModule } from '../categories/categories.module';
import { MockDataController } from './mock-data.controller';
import { MockDataService } from './mock-data.service';
import { ProductsModule } from '../products/products.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category, Product, Attribute]),
    CategoriesModule,
    AttributesModule,
    ProductsModule,
    UsersModule,
  ],
  controllers: [MockDataController],
  providers: [MockDataService],
})
export class MockDataModule {}

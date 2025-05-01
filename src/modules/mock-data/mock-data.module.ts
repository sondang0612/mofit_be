import { Module } from '@nestjs/common';
import { AttributesModule } from '../attributes/attributes.module';
import { BrandsModule } from '../brands/brands.module';
import { CategoriesModule } from '../categories/categories.module';
import { DiscountsModule } from '../discounts/discounts.module';
import { ProductsModule } from '../products/products.module';
import { UsersModule } from '../users/users.module';
import { MockDataController } from './mock-data.controller';
import { MockDataService } from './mock-data.service';

@Module({
  imports: [
    CategoriesModule,
    AttributesModule,
    ProductsModule,
    UsersModule,
    DiscountsModule,
    BrandsModule,
  ],
  controllers: [MockDataController],
  providers: [MockDataService],
})
export class MockDataModule {}

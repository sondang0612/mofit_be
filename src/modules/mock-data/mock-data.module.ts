import { Module } from '@nestjs/common';
import { AttributesModule } from '../attributes/attributes.module';
import { CategoriesModule } from '../categories/categories.module';
import { ProductsModule } from '../products/products.module';
import { UsersModule } from '../users/users.module';
import { MockDataController } from './mock-data.controller';
import { MockDataService } from './mock-data.service';
import { DiscountsModule } from '../discounts/discounts.module';

@Module({
  imports: [
    CategoriesModule,
    AttributesModule,
    ProductsModule,
    UsersModule,
    DiscountsModule,
  ],
  controllers: [MockDataController],
  providers: [MockDataService],
})
export class MockDataModule {}

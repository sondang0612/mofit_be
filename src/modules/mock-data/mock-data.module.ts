import { Module } from '@nestjs/common';
import { MockDataService } from './mock-data.service';
import { MockDataController } from './mock-data.controller';
import { CategoriesModule } from '../categories/categories.module';
import { ProductsModule } from '../products/products.module';
import { AttributesModule } from '../attributes/attributes.module';

@Module({
  imports: [CategoriesModule, ProductsModule, AttributesModule],
  controllers: [MockDataController],
  providers: [MockDataService],
})
export class MockDataModule {}

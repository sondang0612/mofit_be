import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import {
  attributesData,
  categoriesData,
  productsData,
} from 'src/database/data';
import { In } from 'typeorm';
import { AttributesService } from '../attributes/attributes.service';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class MockDataService {
  constructor(
    private readonly productsService: ProductsService,
    private readonly categoriesService: CategoriesService,
    private readonly attributesService: AttributesService,
  ) {}
  async run() {
    try {
      await this.importCategories();
      await this.importAttributes();
      await this.importProducts();

      return {
        message: 'Ok',
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async importCategories() {
    await this.categoriesService.createMulti(categoriesData as any);
  }

  async importAttributes() {
    await this.attributesService.createMulti(attributesData as any);
  }

  async importProducts() {
    const products = await Promise.all(
      productsData.map(async (product) => {
        const category = await this.categoriesService.findBy({
          name: product.categoryName,
        });
        const attributes = await this.attributesService.findBy({
          name: In(product.attributeNames),
        });
        return {
          ...product,
          category: category[0],
          attributes,
        };
      }),
    );

    await this.productsService.createMulti(products as any);
  }
}

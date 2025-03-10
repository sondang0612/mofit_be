import { BadRequestException, Injectable } from '@nestjs/common';
import { hashPassword } from 'src/common/utils/hashPassword';
import {
  attributesData,
  categoriesData,
  productsData,
  usersData,
} from 'src/database/data';
import { In } from 'typeorm';
import { AttributesService } from '../attributes/attributes.service';
import { CategoriesService } from '../categories/categories.service';
import { ProductsService } from '../products/products.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class MockDataService {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly productsService: ProductsService,
    private readonly attributesService: AttributesService,
    private readonly usersService: UsersService,
  ) {}
  async run() {
    try {
      await this.importCategories();
      await this.importAttributes();
      await this.importProducts();
      await this.importUsersData();

      return {
        message: 'Ok',
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async importCategories() {
    await this.categoriesService._createMany(categoriesData as any);
  }

  async importAttributes() {
    await this.attributesService._createMany(attributesData as any);
  }

  async importUsersData() {
    const hashedPasswordUsersData = await Promise.all(
      usersData?.map(async (item) => ({
        ...item,
        password: await hashPassword(item.password),
      })),
    );

    await this.usersService._createMany(hashedPasswordUsersData as any);
  }

  async importProducts() {
    const products = await Promise.all(
      productsData.map(async (product) => {
        const category = await this.categoriesService._findOne({
          where: { name: product.categoryName },
        });
        const attributes = await this.attributesService.repository.findBy({
          name: In(product.attributeNames),
        });

        return {
          ...product,
          category: category,
          attributes,
        };
      }),
    );

    await this.productsService._createMany(products as any);
  }
}

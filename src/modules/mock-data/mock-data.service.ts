import { BadRequestException, Injectable } from '@nestjs/common';
import { hashPassword } from 'src/common/utils/hashPassword';
import {
  attributesData,
  categoriesData,
  productsData,
  usersData,
} from 'src/database/data';
import { In } from 'typeorm';
import { AttributesRepository } from '../attributes/attributes.repository';
import { CategoriesRepository } from '../categories/categories.repository';
import { ProductsRepository } from '../products/products.repository';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class MockDataService {
  constructor(
    private readonly categoriesRepository: CategoriesRepository,
    private readonly productsRepository: ProductsRepository,
    private readonly attributesRepository: AttributesRepository,
    private readonly usersRepository: UsersRepository,
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
    await this.categoriesRepository._createMany(categoriesData as any);
  }

  async importAttributes() {
    await this.attributesRepository._createMany(attributesData as any);
  }

  async importUsersData() {
    const hashedPasswordUsersData = await Promise.all(
      usersData?.map(async (item) => ({
        ...item,
        password: await hashPassword(item.password),
      })),
    );

    await this.usersRepository._createMany(hashedPasswordUsersData as any);
  }

  async importProducts() {
    const products = await Promise.all(
      productsData.map(async (product) => {
        const category = await this.categoriesRepository.findOne({
          where: { name: product.categoryName },
        });
        const attributes = await this.attributesRepository.findBy({
          name: In(product.attributeNames),
        });

        return {
          ...product,
          category: category,
          attributes,
        };
      }),
    );

    await this.productsRepository._createMany(products as any);
  }
}

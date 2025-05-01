import { BadRequestException, Injectable } from '@nestjs/common';
import { hashPassword } from 'src/common/utils/hash-password';
import { slug } from 'src/common/utils/slug';
import {
  attributesData,
  brandsData,
  categoriesData,
  discountsData,
  productsData,
  usersData,
} from 'src/database/data';
import { In } from 'typeorm';
import { AttributesService } from '../attributes/attributes.service';
import { BrandsService } from '../brands/brands.service';
import { CategoriesService } from '../categories/categories.service';
import { DiscountsService } from '../discounts/discounts.service';
import { ProductsService } from '../products/products.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class MockDataService {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly productsService: ProductsService,
    private readonly attributesService: AttributesService,
    private readonly usersService: UsersService,
    private readonly discountsService: DiscountsService,
    private readonly brandService: BrandsService,
  ) {}
  async run() {
    try {
      // await this.importCategories();
      await this.importBrands();
      // await this.importDiscounts();
      await this.importAttributes();
      // await this.importProducts();
      // await this.importProducts();
      // await this.importProducts();
      await this.importUsersData();

      return {
        message: 'Ok',
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async importCategories() {
    for (const item of categoriesData) {
      const category = await this.categoriesService._create({
        name: item.name,
        imgSrc: item?.imgSrc,
      });

      if (item?.subCategories?.length > 0) {
        const subCategories = await Promise.all(
          item.subCategories.map(async (subItem) => {
            return this.categoriesService._create({
              name: subItem.name,
              parentCategory: category,
              imgSrc: subItem?.imgSrc,
            });
          }),
        );
        category.subCategories = subCategories;
      }
    }
  }

  async importAttributes() {
    await this.attributesService._createMany(attributesData as any);
  }

  async importDiscounts() {
    await this.discountsService._createMany(discountsData as any);
  }

  async importBrands() {
    await this.brandService._createMany(brandsData as any);
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
    await Promise.all(
      productsData.map(async (productData) => {
        let discount = null;

        const category = await this.categoriesService._findOne({
          where: { name: productData.categoryName },
        });

        const attributes = await this.attributesService.repository.findBy({
          value: In(productData.attributeValues),
          isDeleted: false,
        });

        if (productData?.discountPercentage) {
          discount = await this.discountsService._findOne({
            where: { percentage: productData?.discountPercentage },
          });
        }

        const brand = await this.brandService._findOne({
          where: { name: productData?.brandName },
        });

        const createdProduct = await this.productsService.repository.save({
          ...productData,
          category,
          attributes,
          brand,
          slug: slug(productData.title),
          ...(discount ? { discount } : {}),
        });

        return createdProduct;
      }),
    );
  }
}

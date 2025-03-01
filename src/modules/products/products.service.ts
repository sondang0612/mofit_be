import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from '../categories/categories.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductPaginationDto } from './dto/product-pagination.dto';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productRepository: ProductsRepository,
    private readonly categoriesRepository: CategoriesRepository,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const categories = await this.categoriesRepository._findByIdsOrFail(
      createProductDto.categoryIds,
    );

    const product = await this.productRepository._create({
      ...createProductDto,
      categories,
    });

    return {
      message: 'Product created successfully!',
      data: product,
    };
  }

  async findAll(paginationDto: ProductPaginationDto) {
    const { attributeName, limit, page, sortBy, sort } = paginationDto;

    const queryBuilder = this.productRepository
      .createQueryBuilder(this.productRepository.entityName)
      .leftJoinAndSelect(
        `${this.productRepository.entityName}.attributes`,
        'attributes',
      )
      .leftJoinAndSelect(
        `${this.productRepository.entityName}.category`,
        'category',
      );

    if (attributeName) {
      queryBuilder.andWhere('attributes.name ILIKE :attributeName', {
        attributeName: `%${attributeName}%`,
      });
    }

    const data = await this.productRepository._findAll(queryBuilder, {
      limit,
      page,
      sort: {
        field: sortBy,
        order: sort,
      },
    });

    return {
      message: 'Get all successfully!!',
      data,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }
}

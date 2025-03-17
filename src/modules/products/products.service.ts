import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/database/entities/product.entity';
import { TypeOrmBaseService } from 'src/database/services/typeorm-base.service';
import { Repository } from 'typeorm';
import { CategoriesService } from '../categories/categories.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductPaginationDto } from './dto/product-pagination.dto';
import { SortOrder } from 'src/common/dtos/pagination.dto';
@Injectable()
export class ProductsService extends TypeOrmBaseService<Product> {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly categoriesService: CategoriesService,
  ) {
    super(productRepository);
  }

  async create(createProductDto: CreateProductDto) {
    const categories = await this.categoriesService._findByIdsOrFail(
      createProductDto.categoryIds,
    );

    const product = await this._create({
      ...createProductDto,
      categories,
    });

    return {
      message: 'Product created successfully!',
      data: product,
    };
  }

  async findAll(paginationDto: ProductPaginationDto) {
    const {
      attributeValue,
      limit,
      page,
      category,
      brands,
      minPrice,
      maxPrice,
    } = paginationDto;
    let { sortBy, sort } = paginationDto;

    const queryBuilder = this.productRepository
      .createQueryBuilder(this.entityName)
      .leftJoinAndSelect(`${this.entityName}.attributes`, 'attributes')
      .leftJoinAndSelect(`${this.entityName}.category`, 'category')
      .leftJoinAndSelect(`${this.entityName}.discount`, 'discount')
      .leftJoinAndSelect(`${this.entityName}.brand`, 'brand');

    switch (attributeValue) {
      case undefined:
        break;

      case 'new_arrivals':
      case 'best_seller':
      case 'top_rated':
      case 'featured':
        queryBuilder.andWhere('attributes.value = :attributeValue', {
          attributeValue,
        });
        break;
      case 'price_desc':
        sortBy = 'finalPrice';
        sort = SortOrder.DESC;
        break;
      case 'price_asc':
        sortBy = 'finalPrice';
        sort = SortOrder.ASC;
        break;

      default:
        break;
    }

    if (category) {
      queryBuilder.andWhere(
        '(category.id = :category OR category.parentCategoryId = :category)',
        {
          category,
        },
      );
    }

    if (Array.isArray(brands)) {
      queryBuilder.andWhere('brand.id IN (:...brands)', { brands });
    }

    if (minPrice) {
      queryBuilder.andWhere('price >= :minPrice', {
        minPrice,
      });
    }

    if (maxPrice) {
      queryBuilder.andWhere('price <= :maxPrice', {
        maxPrice,
      });
    }

    const data = await this._findAll(queryBuilder, {
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

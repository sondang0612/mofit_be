import { Injectable } from '@nestjs/common';
import { Product } from 'src/database/entities/product.entity';
import { TypeOrmBaseService } from 'src/database/services/typeorm-base.service';
import { CategoriesService } from '../categories/categories.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductPaginationDto } from './dto/product-pagination.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

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
    const { attributeName, limit, page, sortBy, sort } = paginationDto;

    const queryBuilder = this.productRepository
      .createQueryBuilder(this.entityName)
      .leftJoinAndSelect(`${this.entityName}.attributes`, 'attributes')
      .leftJoinAndSelect(`${this.entityName}.category`, 'category');

    if (attributeName) {
      queryBuilder.andWhere('attributes.name ILIKE :attributeName', {
        attributeName: `%${attributeName}%`,
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

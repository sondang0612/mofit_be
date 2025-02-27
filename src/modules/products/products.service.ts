import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/database/entities/product.entity';
import { Repository } from 'typeorm';
import { CategoriesService } from '../categories/categories.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductPaginationDto } from './dto/product-pagination.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { TypeOrmBaseService } from 'src/database/services/typeorm-base.service';

@Injectable()
export class ProductsService extends TypeOrmBaseService<Product> {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @Inject(forwardRef(() => CategoriesService))
    private categoryService: CategoriesService,
  ) {
    super(productRepository);
  }

  async create(createProductDto: CreateProductDto) {
    const categories = await this.categoryService.findByIdsOrFail(
      createProductDto.categoryIds,
    );

    const product = await this.createOne({
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

    let queryBuilder = this.repository
      .createQueryBuilder(this.entityName)
      .leftJoinAndSelect(`${this.entityName}.attributes`, 'attributes')
      .leftJoinAndSelect(`${this.entityName}.category`, 'category');

    if (attributeName) {
      queryBuilder.andWhere('attributes.name ILIKE :attributeName', {
        attributeName: `%${attributeName}%`,
      });
    }

    const data = await this.getAll(queryBuilder, {
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

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}

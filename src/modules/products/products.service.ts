import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain } from 'class-transformer';
import { SortOrder } from 'src/common/dtos/pagination.dto';
import { slug } from 'src/common/utils/slug';
import { Product } from 'src/database/entities/product.entity';
import { TypeOrmBaseService } from 'src/database/services/typeorm-base.service';
import { Repository } from 'typeorm';
import { CategoriesService } from '../categories/categories.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductPaginationDto } from './dto/product-pagination.dto';
import { UserParams } from 'src/common/decorators/user.decorator';
import { UpdateProductDto } from './dto/update-product.dto';
import { ETableName } from 'src/common/constants/table-name.enum';
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
    const {
      brandId,
      categoryId,
      price,
      title,
      attributeIds,
      description,
      discountId,
      shortDescription,
      sku,
      images,
      origin,
      specifications,
    } = createProductDto;

    const imagesData = {
      cover: images[0] || null,
      other: images.slice(1),
    };

    await this._create({
      brand: { id: brandId },
      category: { id: categoryId },
      price,
      title,
      attributes: attributeIds?.map((item) => ({ id: item })),
      description,
      discount: { id: discountId },
      shortDescription,
      sku,
      slug: slug(title),
      images: imagesData,
      origin,
      specifications,
    });

    return {
      message: 'Product created successfully!',
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
      searchQuery,
      q,
    } = paginationDto;
    let { sortBy, sort } = paginationDto;

    const queryBuilder = this.productRepository
      .createQueryBuilder(this.entityName)
      .andWhere(`${this.entityName}.isDeleted=:isDeleted`, { isDeleted: false })
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
        sortBy = 'price';
        sort = SortOrder.DESC;
        break;
      case 'price_asc':
        sortBy = 'price';
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

    if (searchQuery) {
      queryBuilder.andWhere('(LOWER(title) LIKE LOWER(:searchQuery))', {
        searchQuery: `%${searchQuery}%`,
      });
    }

    if (q) {
      queryBuilder.andWhere('(LOWER(title) LIKE LOWER(:searchQuery))', {
        searchQuery: `%${q}%`,
      });
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

  async findAllByAdmin(paginationDto: ProductPaginationDto) {
    const {
      attributeValue,
      limit,
      page,
      category,
      brands,
      minPrice,
      maxPrice,
      searchQuery,
      q,
    } = paginationDto;
    let { sortBy, sort } = paginationDto;

    const queryBuilder = this.productRepository
      .createQueryBuilder(this.entityName)
      .andWhere(`${this.entityName}.isDeleted=:isDeleted`, { isDeleted: false })
      .leftJoinAndSelect(`${this.entityName}.attributes`, 'attributes')
      .leftJoinAndSelect(`${this.entityName}.category`, 'category')
      .leftJoinAndSelect(`${this.entityName}.discount`, 'discount')
      .leftJoinAndSelect(`${this.entityName}.brand`, 'brand')
      .leftJoin(
        ETableName.ORDER_ITEM,
        'orderItems',
        `CAST(jsonb_extract_path_text(orderItems.product, 'id') AS INTEGER) = ${this.entityName}.id`,
      )
      .addSelect((qb) => {
        return qb
          .select('COUNT(orderItems.id)', 'totalSold')
          .from(ETableName.ORDER_ITEM, 'orderItems')
          .where(
            `CAST(jsonb_extract_path_text(orderItems.product, 'id') AS INTEGER) = ${this.entityName}.id`,
          );
      }, 'totalSold');

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
        sortBy = 'price';
        sort = SortOrder.DESC;
        break;
      case 'price_asc':
        sortBy = 'price';
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

    if (searchQuery) {
      queryBuilder.andWhere('(LOWER(title) LIKE LOWER(:searchQuery))', {
        searchQuery: `%${searchQuery}%`,
      });
    }

    if (q) {
      queryBuilder.andWhere('(LOWER(title) LIKE LOWER(:searchQuery))', {
        searchQuery: `%${q}%`,
      });
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
    const mappedData = (await queryBuilder.getRawMany()) as any;
    const results = data.data.map((item, index) => ({
      ...item,
      totalSold: Number(mappedData[index].totalSold),
    }));

    return {
      message: 'Get all successfully!!',
      data: { ...data, data: results },
    };
  }

  async findOne(slug: string) {
    const product = await this._findOneOrFail({
      where: { slug },
      relations: ['category', 'attributes', 'discount', 'brand'],
    });

    return {
      data: { ...instanceToPlain(product) },
      message: 'Get product successfully!',
    };
  }

  async findOneById(id: number) {
    const product = await this._findOneOrFail({
      where: { id },
      relations: ['category', 'attributes', 'discount', 'brand'],
    });

    return {
      data: { ...instanceToPlain(product) },
      message: 'Get product successfully!',
    };
  }

  async deleteOne(id: number, user: UserParams) {
    await this._softDelete(id, user.email);

    return null;
  }

  async updateOne(args: UpdateProductDto) {
    const {
      id,
      brandId,
      categoryId,
      description,
      images,
      origin,
      price,
      shortDescription,
      sku,
      specifications,
      title,
    } = args;

    const imagesData = {
      cover: images[0] || null,
      other: images.slice(1),
    };

    await this.repository.update(id, {
      title,
      description,
      origin,
      price,
      shortDescription,
      sku,
      specifications,
      images: imagesData as any,
      slug: slug(title),
      category: { id: categoryId },
      brand: { id: brandId },
    });

    return { message: 'Update successful!!' };
  }
}

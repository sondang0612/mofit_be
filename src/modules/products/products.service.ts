import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain } from 'class-transformer';
import { SortOrder } from 'src/common/dtos/pagination.dto';
import { Product } from 'src/database/entities/product.entity';
import { TypeOrmBaseService } from 'src/database/services/typeorm-base.service';
import { Repository } from 'typeorm';
import { CategoriesService } from '../categories/categories.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductPaginationDto } from './dto/product-pagination.dto';
import { EImageTargetType } from 'src/common/constants/image-target-type.enum';
import { Image } from 'src/database/entities/image.entity';
import { ImagesService } from '../images/images.service';
import { slug } from 'src/common/utils/slug';
@Injectable()
export class ProductsService extends TypeOrmBaseService<Product> {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly categoriesService: CategoriesService,
    private readonly imagesService: ImagesService,
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
    } = createProductDto;

    const product = await this._create({
      brand: { id: brandId },
      category: { id: categoryId },
      price,
      title,
      attributes: attributeIds.map((item) => ({ id: item })),
      description,
      discount: { id: discountId },
      shortDescription,
      sku,
      slug: slug(title),
    });

    await this.imagesService._createMany(
      images?.map((image) => ({
        url: image,
        targetId: product.id,
        targetType: EImageTargetType.PRODUCT,
      })),
    );

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
    } = paginationDto;
    let { sortBy, sort } = paginationDto;

    const queryBuilder = this.productRepository
      .createQueryBuilder(this.entityName)
      .leftJoinAndSelect(`${this.entityName}.attributes`, 'attributes')
      .leftJoinAndSelect(`${this.entityName}.category`, 'category')
      .leftJoinAndSelect(`${this.entityName}.discount`, 'discount')
      .leftJoinAndSelect(`${this.entityName}.brand`, 'brand')
      .leftJoinAndMapMany(
        `${this.entityName}.images`,
        Image,
        'images',
        `images.targetId = ${this.entityName}.id AND images.targetType = :targetType`,
        { targetType: EImageTargetType.PRODUCT },
      );

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

  async findOne(slug: string) {
    const product = await this._findOneOrFail({
      where: { slug },
      relations: ['category', 'attributes', 'discount', 'brand'],
    });

    const images = await this.imagesService.repository.find({
      where: { targetId: product.id },
    });
    return {
      data: { ...instanceToPlain(product), images: instanceToPlain(images) },
      message: 'Get product successfully!',
    };
  }
}

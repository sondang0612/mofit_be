import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToInstance, instanceToPlain } from 'class-transformer';
import { Category } from 'src/database/entities/category.entity';
import { TypeOrmBaseService } from 'src/database/services/typeorm-base.service';
import { DataSource, Repository } from 'typeorm';
import { CategoriesPaginationDto } from './dto/categories-pagination.dto';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService extends TypeOrmBaseService<Category> {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
    private readonly dataSource: DataSource,
  ) {
    super(categoriesRepository);
  }

  create(createCategoryDto: CreateCategoryDto) {
    const { imgSrc, name, parentCategoryId } = createCategoryDto;
    return this._create({
      name,
      imgSrc,
      parentCategory: { id: parentCategoryId },
    });
  }

  async findAll() {
    const categories = instanceToInstance(
      await this.categoriesRepository.find({
        where: { isDeleted: false },
        relations: ['parentCategory'],
      }),
    );

    const categoryMap = new Map<string, any>();

    categories.forEach((category) => {
      categoryMap.set(`${category.id}`, { ...category, subCategories: [] });
    });

    categories.forEach((category) => {
      if (category.parentCategory) {
        const parent = categoryMap.get(`${category.parentCategory.id}`);
        if (parent) {
          parent.subCategories.push(categoryMap.get(`${category.id}`));
        }
      }
    });

    const rootCategories = Array.from(categoryMap.values()).filter(
      (category) => !category.parentCategory,
    );

    return {
      msg: 'Get list categories successfully!',
      data: rootCategories,
    };
  }

  async findAllWithPagination(args: CategoriesPaginationDto) {
    const { limit, page, sortBy, sort, q } = args;

    const queryBuilder = this.categoriesRepository
      .createQueryBuilder(this.entityName)
      .leftJoinAndSelect(`${this.entityName}.parentCategory`, 'parentCategory');

    if (q) {
      queryBuilder.andWhere(`LOWER(${this.entityName}.name) LIKE :q`, {
        q: `%${q.toLowerCase()}%`,
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

  async findNewestCategories() {
    const categories = instanceToInstance(
      await this.categoriesRepository.findOne({
        where: { isDeleted: false, name: 'Pickleball' },
        relations: ['subCategories'],
      }),
    );

    return {
      message: 'Get list categories successfully!',
      data: instanceToPlain(categories),
    };
  }

  async findWithoutPagination() {
    const data = await this.categoriesRepository.find({
      where: { isDeleted: false },
      select: ['id', 'name'],
    });

    return {
      message: 'Get list categories successfully!',
      data: data,
    };
  }

  async findLeafCategories() {
    const alias = this.entityName;
    const qb = this.categoriesRepository.createQueryBuilder(alias);

    const data = await qb
      .leftJoin(`${alias}.subCategories`, 'child')
      .where(`${alias}.isDeleted = false`)
      .andWhere('child.id IS NULL')
      .select([`${alias}.id`, `${alias}.name`])
      .getMany();

    return {
      message: 'Get leaf categories successfully!',
      data,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  async deleteOne(id: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Soft delete category cha
      await queryRunner.manager.update(
        Category,
        {
          id,
        },
        { isDeleted: true },
      );

      await queryRunner.manager.update(
        Category,
        { parentCategory: { id } },
        { parentCategory: null },
      );

      await queryRunner.commitTransaction();
      return `This action soft-deletes category #${id} and unlinks its children.`;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new Error(`Delete failed: ${error.message}`);
    } finally {
      await queryRunner.release();
    }
  }
}

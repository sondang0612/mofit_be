import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Repository } from 'typeorm';
import { Category } from 'src/database/entities/category.entity';
import { TypeOrmBaseService } from 'src/database/services/typeorm-base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToInstance } from 'class-transformer';

@Injectable()
export class CategoriesService extends TypeOrmBaseService<Category> {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {
    super(categoriesRepository);
  }

  create(createCategoryDto: CreateCategoryDto) {
    return this._create(createCategoryDto);
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
          parent.subCategories.push(category);
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

  async findNewestCategories() {
    const categories = instanceToInstance(
      await this.categoriesRepository.findOne({
        where: { isDeleted: false, name: 'Pickleball' },
        relations: ['subCategories'],
      }),
    );

    return {
      msg: 'Get list categories successfully!',
      data: categories,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }
}

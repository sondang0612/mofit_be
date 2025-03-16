import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Repository } from 'typeorm';
import { Category } from 'src/database/entities/category.entity';
import { TypeOrmBaseService } from 'src/database/services/typeorm-base.service';
import { InjectRepository } from '@nestjs/typeorm';

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
    const categories = await this.categoriesRepository.find({
      where: { isDeleted: false },
    });

    return {
      msg: 'Get list categories successfully!',
      data: categories,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }
}

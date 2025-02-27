import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from 'src/database/entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsService } from '../products/products.service';
import { TypeOrmBaseService } from 'src/database/services/typeorm-base.service';

@Injectable()
export class CategoriesService extends TypeOrmBaseService<Category> {
  constructor(
    @InjectRepository(Category)
    private readonly categoryServices: Repository<Category>,
    @Inject(forwardRef(() => ProductsService))
    private productServices: ProductsService,
  ) {
    super(categoryServices);
  }

  create(createCategoryDto: CreateCategoryDto) {
    return this.createOne(createCategoryDto);
  }

  findAll() {
    return `This action returns all categories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}

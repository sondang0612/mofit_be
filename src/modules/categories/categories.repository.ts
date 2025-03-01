import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Category } from 'src/database/entities/category.entity';
import { BaseRepository } from 'src/database/repositories/base.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriesRepository extends BaseRepository<Category> {
  constructor(@InjectRepository(Category) repository: Repository<Category>) {
    super(Category, repository);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/database/entities/product.entity';
import { BaseRepository } from 'src/database/repositories/base.repository';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsRepository extends BaseRepository<Product> {
  constructor(@InjectRepository(Product) repository: Repository<Product>) {
    super(Product, repository);
  }
}

import { Injectable } from '@nestjs/common';
import { Product } from 'src/database/entities/product.entity';
import { BaseRepository } from 'src/database/repositories/base.repository';

@Injectable()
export class ProductRepository extends BaseRepository<Product> {}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductLike } from 'src/database/entities/product-like.entity';
import { TypeOrmBaseService } from 'src/database/services/typeorm-base.service';
import { Repository } from 'typeorm';

@Injectable()
export class ProductLikeService extends TypeOrmBaseService<ProductLike> {
  constructor(
    @InjectRepository(ProductLike)
    private readonly productLikeRepository: Repository<ProductLike>,
  ) {
    super(productLikeRepository);
  }
}

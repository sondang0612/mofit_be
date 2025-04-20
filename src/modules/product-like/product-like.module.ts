import { Module } from '@nestjs/common';
import { ProductLikeService } from './product-like.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductLike } from 'src/database/entities/product-like.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductLike])],
  providers: [ProductLikeService],
  exports: [ProductLikeService],
})
export class ProductLikeModule {}

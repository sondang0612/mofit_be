import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from 'src/database/entities/brand.entity';
import { TypeOrmBaseService } from 'src/database/services/typeorm-base.service';
import { Repository } from 'typeorm';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Injectable()
export class BrandsService extends TypeOrmBaseService<Brand> {
  constructor(
    @InjectRepository(Brand)
    private readonly brandsRepository: Repository<Brand>,
  ) {
    super(brandsRepository);
  }

  create(createBrandDto: CreateBrandDto) {
    return 'This action adds a new brand';
  }

  async findAll() {
    const brands = await this.brandsRepository
      .createQueryBuilder('brands')
      .leftJoin('brands.products', 'product')
      .select([
        'brands.id AS id',
        'brands.name AS name',
        'CAST(COUNT(product.id) AS INT) AS "totalProducts"',
      ])
      .groupBy('brands.id, brands.name')
      .getRawMany();
    return {
      msg: 'Get brands successfully!',
      data: brands,
    };
  }

  async findOne(brandId: number) {
    const brand = await this.brandsRepository
      .createQueryBuilder('brand')
      .leftJoin('brand.products', 'product')
      .where('brand.id = :brandId', { brandId })
      .select([
        'brand.id AS id',
        'brand.name AS name',
        'CAST(COUNT(product.id) AS INT) AS "totalProducts"',
      ])
      .groupBy('brand.id, brand.name')
      .getRawOne();
    return {
      msg: 'Get brand details successfully!',
      data: brand,
    };
  }

  update(id: number, updateBrandDto: UpdateBrandDto) {
    return `This action updates a #${id} brand`;
  }

  remove(id: number) {
    return `This action removes a #${id} brand`;
  }
}

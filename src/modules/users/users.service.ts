import { Injectable } from '@nestjs/common';
import { User } from 'src/database/entities/user.entity';
import { TypeOrmBaseService } from 'src/database/services/typeorm-base.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductPagination } from './dto/product-pagination.dto';

@Injectable()
export class UsersService extends TypeOrmBaseService<User> {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  create(createUserDto: CreateUserDto) {
    return this._create(createUserDto);
  }

  async findAll(args: ProductPagination) {
    const { limit, page, sort, sortBy } = args;
    const queryBuilder = this.userRepository.createQueryBuilder(
      this.entityName,
    );

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
}

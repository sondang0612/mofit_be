import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EOrderStatus } from 'src/common/constants/order.enum';
import { EUserDeleteRequestStatus } from 'src/common/constants/user-delete-request-status.enum';
import { UserParams } from 'src/common/decorators/user.decorator';
import { User } from 'src/database/entities/user.entity';
import { TypeOrmBaseService } from 'src/database/services/typeorm-base.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserPagination } from './dto/user-pagination.dto';

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

  async requestDelete(user: UserParams) {
    if (user.deletionStatus === EUserDeleteRequestStatus.PENDING) {
      throw new BadRequestException('Delete request created, please wait');
    }

    if (user.deletionStatus === EUserDeleteRequestStatus.APPROVED) {
      throw new BadRequestException('Account is Deleted');
    }

    await this.userRepository.update(user.id, {
      deletionStatus: EUserDeleteRequestStatus.PENDING,
    });
    return {
      message: 'Create Delete Request Successfully',
    };
  }

  async findAll(args: UserPagination) {
    const { limit, page, sort, sortBy, role, q } = args;

    const queryBuilder = this.userRepository
      .createQueryBuilder(this.entityName)
      .loadRelationCountAndMap(
        `${this.entityName}.orderCount`,
        `${this.entityName}.orders`,
        'order',
        (qb) =>
          qb.where('order.status != :status', { status: EOrderStatus.DRAFT }),
      );

    if (role) {
      queryBuilder.andWhere(`${this.entityName}.role = :role`, { role });
    }

    if (q) {
      queryBuilder.andWhere(
        `(
          ${this.entityName}.firstName LIKE :q OR
          ${this.entityName}.lastName LIKE :q OR
          ${this.entityName}.phoneNumber LIKE :q OR
          ${this.entityName}.email LIKE :q
        )`,
        { q: `%${q}%` },
      );
    }

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

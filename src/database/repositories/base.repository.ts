import { Injectable, NotFoundException, Type } from '@nestjs/common';
import { instanceToInstance } from 'class-transformer';
import { SortOrder } from 'src/common/dtos/pagination.dto';
import {
  Repository,
  EntityTarget,
  FindOneOptions,
  DeepPartial,
  SelectQueryBuilder,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export interface BaseEntity {
  id: number | string;
}

export abstract class BaseRepository<
  TEntity extends BaseEntity,
> extends Repository<TEntity> {
  protected readonly entityName: string;
  constructor(
    protected readonly entityTarget: EntityTarget<TEntity>,
    protected readonly repository: Repository<TEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
    this.entityName = this.repository.metadata.name;
  }

  async findOneOrFail(options: FindOneOptions<TEntity>): Promise<TEntity> {
    const entity = await this.findOne(options);
    if (!entity) {
      throw new NotFoundException(`${this.entityTarget.toString()} not found`);
    }
    return entity;
  }

  public async findAll(
    queryBuilder: SelectQueryBuilder<TEntity>,
    {
      page = 1,
      limit = 10,
      sort,
    }: {
      page?: number;
      limit?: number;
      sort?: { field: string; order: SortOrder };
    },
  ): Promise<{ data: TEntity[]; total: number }> {
    queryBuilder.andWhere(`${this.entityName}.isDeleted = :isDeleted`, {
      isDeleted: false,
    });

    if (sort && sort.field) {
      queryBuilder.orderBy(
        `${this.entityName}.${sort.field}`,
        sort.order as any,
      );
    } else {
      queryBuilder.orderBy(`${this.entityName}.createdAt`, 'DESC');
    }

    queryBuilder.take(limit);
    queryBuilder.skip((page - 1) * limit);

    const [data, total] = await queryBuilder.getManyAndCount();

    return {
      data: instanceToInstance(data),
      total,
    };
  }
}

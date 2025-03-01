import { NotFoundException } from '@nestjs/common';
import { instanceToInstance } from 'class-transformer';
import { EDefaultEmail } from 'src/common/constants/default-email.enum';
import { SortOrder } from 'src/common/dtos/pagination.dto';
import {
  DeepPartial,
  FindOneOptions,
  FindOptionsWhere,
  In,
  Repository,
  SaveOptions,
  SelectQueryBuilder,
} from 'typeorm';
import { BaseEntity } from '../entities/base.entity';

type CreateEntityOpts = Partial<{
  userEmail?: string;
  saveOptions: SaveOptions;
}>;

export class TypeOrmBaseService<TEntity extends BaseEntity> {
  protected readonly entityName: string;

  constructor(public readonly repository: Repository<TEntity>) {
    this.entityName = this.repository.metadata.name;
  }

  async createOne<TCreateDto extends DeepPartial<TEntity>>(
    createDto: TCreateDto,
    opts: CreateEntityOpts = {},
  ): Promise<TEntity> {
    const { saveOptions } = opts;
    const entity = this.createEntity(createDto, opts);
    const newDoc = await this.repository.save(entity, saveOptions);
    return newDoc;
  }

  createEntity<TCreateDto extends DeepPartial<TEntity>>(
    createDto: TCreateDto,
    opts: CreateEntityOpts = {},
  ) {
    const { userEmail } = opts;
    const entity = this.repository.create(createDto);
    entity.createdBy = userEmail || EDefaultEmail.SYSTEM_GENERATED;
    return entity;
  }

  async getOne(
    findOneOptions: FindOneOptions<TEntity>,
  ): Promise<TEntity | null> {
    return this.repository.findOne({
      ...findOneOptions,
      where: {
        ...findOneOptions.where,
        isDeleted: false,
      } as FindOptionsWhere<TEntity>,
    });
  }

  async getOneOrFail(
    findOneOptions: FindOneOptions<TEntity>,
    opts: Partial<{ errMsg: string }> = {},
  ): Promise<TEntity> {
    const entity = await this.getOne(findOneOptions);
    if (!entity) {
      throw new NotFoundException(
        opts.errMsg || `[${this.entityName}] Not found`,
      );
    }
    return entity;
  }

  async createMulti<TCreateDto extends DeepPartial<TEntity>>(
    createDtos: TCreateDto[],
    opts: CreateEntityOpts = {},
  ): Promise<TEntity[]> {
    const { saveOptions } = opts;
    const entities = this.repository.create(createDtos);
    return await this.repository.save(entities, saveOptions);
  }

  async findByIdsOrFail(ids: number[]): Promise<TEntity[]> {
    const entities = await this.repository.findBy({
      id: In(ids),
    } as FindOptionsWhere<TEntity>);
    if (entities.length === 0) {
      throw new NotFoundException(
        `[${this.entityName}] No records found for given IDs`,
      );
    }
    return entities;
  }

  async findBy(
    where: FindOptionsWhere<TEntity> | FindOptionsWhere<TEntity>[],
  ): Promise<TEntity[]> {
    const entities = await this.repository.findBy(where);
    if (entities.length === 0) {
      throw new NotFoundException(
        `[${this.entityName}] No records found for given Options`,
      );
    }
    return entities;
  }

  public async getAll(
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

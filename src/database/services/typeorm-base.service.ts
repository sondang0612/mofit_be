import { NotFoundException, UnauthorizedException } from '@nestjs/common';
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
import { UserParams } from 'src/common/decorators/user.decorator';
import { User } from '../entities/user.entity';
import { ERole } from 'src/common/constants/role.enum';

type CreateEntityOpts = Partial<{
  userEmail?: string;
  saveOptions: SaveOptions;
}>;

export class TypeOrmBaseService<TEntity extends BaseEntity> {
  protected readonly entityName: string;

  constructor(public readonly repository: Repository<TEntity>) {
    this.entityName = this.repository.metadata.name;
  }

  async _create<TCreateDto extends DeepPartial<TEntity>>(
    createDto: TCreateDto,
    opts: CreateEntityOpts = {},
  ): Promise<TEntity> {
    const { saveOptions, userEmail } = opts;

    const entity = this.repository.create(createDto);
    entity.createdBy = userEmail || EDefaultEmail.SYSTEM_GENERATED;

    const newDoc = await this.repository.save(entity, saveOptions);
    return newDoc;
  }

  async _createMany<TCreateDto extends DeepPartial<TEntity>>(
    createDtos: TCreateDto[],
    opts: CreateEntityOpts = {},
  ): Promise<TEntity[]> {
    const { saveOptions } = opts;
    const entities = await this.repository.create(createDtos);

    return await this.repository.save(entities, saveOptions);
  }

  public async _findOneOrFail(
    options: FindOneOptions<TEntity>,
  ): Promise<TEntity> {
    const entity = await this._findOne(options);
    if (!entity) {
      throw new NotFoundException(`${this.entityName} not found`);
    }
    return entity;
  }

  public async _findAll(
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
      queryBuilder.addOrderBy(
        `${this.entityName}.${sort.field}`,
        sort.order as any,
      );
    } else {
      queryBuilder.addOrderBy(`${this.entityName}.createdAt`, 'DESC');
    }

    queryBuilder.take(limit);
    queryBuilder.skip((page - 1) * limit);

    const [data, total] = await queryBuilder.getManyAndCount();

    return {
      data: instanceToInstance(data),
      total,
    };
  }

  async _findByIdsOrFail(ids: number[]): Promise<TEntity[]> {
    const entities = await this.repository.findBy({
      id: In(ids),
      isDeleted: false,
    } as FindOptionsWhere<TEntity>);
    if (entities.length === 0) {
      throw new NotFoundException(
        `[${this.entityName}] No records found for given IDs`,
      );
    }
    return entities;
  }

  async _findOrCreate<TCreateDto extends DeepPartial<TEntity>>(
    findOptions: FindOneOptions<TEntity>,
    createDto: TCreateDto,
    opts: CreateEntityOpts = {},
  ): Promise<TEntity> {
    let entity = await this._findOne(findOptions);

    if (!entity) {
      entity = await this._create(createDto, opts);
    }

    return entity;
  }

  public async _findOne(options: FindOneOptions<TEntity>): Promise<TEntity> {
    const entity = await this.repository.findOne({
      ...options,
      where: { ...options.where, isDeleted: false as any },
    });
    return entity;
  }

  async _softDelete(id: number | number[], userEmail?: string): Promise<void> {
    const ids = Array.isArray(id) ? id : [id];

    if (ids.length === 0) {
      return;
    }

    const updateData = {
      isDeleted: true,
      updatedAt: new Date(),
      createdBy: userEmail || EDefaultEmail.SYSTEM_GENERATED,
    };

    await this.repository
      .createQueryBuilder()
      .update(this.entityName)
      .set(updateData as any)
      .where('id IN (:...ids)', { ids })
      .execute();
  }

  _checkAccess(user: UserParams, eUser: User) {
    if (user.role === ERole.USER && user.id !== eUser.id) {
      throw new UnauthorizedException('You cannot access');
    }
  }
}

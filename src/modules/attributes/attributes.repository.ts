import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Attribute } from 'src/database/entities/attribute.entity';
import { BaseRepository } from 'src/database/repositories/base.repository';
import { Repository } from 'typeorm';

@Injectable()
export class AttributesRepository extends BaseRepository<Attribute> {
  constructor(@InjectRepository(Attribute) repository: Repository<Attribute>) {
    super(Attribute, repository);
  }
}

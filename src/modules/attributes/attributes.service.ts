import { Injectable } from '@nestjs/common';
import { Attribute } from 'src/database/entities/attribute.entity';
import { TypeOrmBaseService } from 'src/database/services/typeorm-base.service';
import { Repository } from 'typeorm';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AttributesService extends TypeOrmBaseService<Attribute> {
  constructor(
    @InjectRepository(Attribute)
    private readonly attributesRepository: Repository<Attribute>,
  ) {
    super(attributesRepository);
  }
  create(createAttributeDto: CreateAttributeDto) {
    return this._create(createAttributeDto);
  }

  findAll() {
    return `This action returns all attributes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} attribute`;
  }
}

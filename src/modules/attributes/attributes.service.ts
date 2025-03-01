import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Attribute } from 'src/database/entities/attribute.entity';
import { AttributesRepository } from './attributes.repository';
import { CreateAttributeDto } from './dto/create-attribute.dto';

@Injectable()
export class AttributesService {
  constructor(
    @InjectRepository(Attribute)
    private readonly attributesRepository: AttributesRepository,
  ) {}
  create(createAttributeDto: CreateAttributeDto) {
    return this.attributesRepository._create(createAttributeDto);
  }

  findAll() {
    return `This action returns all attributes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} attribute`;
  }
}

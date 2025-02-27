import { Inject, Injectable } from '@nestjs/common';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attribute } from 'src/database/entities/attribute.entity';
import { TypeOrmBaseService } from 'src/database/services/typeorm-base.service';

@Injectable()
export class AttributesService extends TypeOrmBaseService<Attribute> {
  constructor(
    @InjectRepository(Attribute)
    private readonly attributeServices: Repository<Attribute>,
  ) {
    super(attributeServices);
  }
  create(createAttributeDto: CreateAttributeDto) {
    return this.createOne(createAttributeDto);
  }

  findAll() {
    return `This action returns all attributes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} attribute`;
  }

  update(id: number, updateAttributeDto: UpdateAttributeDto) {
    return `This action updates a #${id} attribute`;
  }

  remove(id: number) {
    return `This action removes a #${id} attribute`;
  }
}

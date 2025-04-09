import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AttributesService } from './attributes.service';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { Auth } from '../auth/guards/global-auth.guard';
import { EAuth } from 'src/common/constants/auth.enum';
import { EApiPathName } from 'src/common/constants/api-path.enum';

@Controller(EApiPathName.ATTRIBUTES)
export class AttributesController {
  constructor(private readonly attributesService: AttributesService) {}

  @Post()
  create(@Body() createAttributeDto: CreateAttributeDto) {
    return this.attributesService.create(createAttributeDto);
  }

  @Get()
  @Auth(EAuth.NONE)
  findAll() {
    return this.attributesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attributesService.findOne(+id);
  }
}

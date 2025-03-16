import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EApiPathName } from 'src/common/constants/api-path.enum';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Auth } from '../auth/guards/global-auth.guard';
import { EAuth } from 'src/common/constants/auth.enum';

@Controller(EApiPathName.CATEGORIES)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @Auth(EAuth.NONE)
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }
}

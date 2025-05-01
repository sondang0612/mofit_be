import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { EApiPathName } from 'src/common/constants/api-path.enum';
import { EAuth } from 'src/common/constants/auth.enum';
import { ERole } from 'src/common/constants/role.enum';
import { Auth, Permissions } from '../auth/guards/global-auth.guard';
import { CategoriesService } from './categories.service';
import { CategoriesPaginationDto } from './dto/categories-pagination.dto';
import { CreateCategoryDto } from './dto/create-category.dto';

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

  @Get('all')
  @Permissions(ERole.ADMIN)
  findAllWithoutPagination() {
    return this.categoriesService.findWithoutPagination();
  }

  @Get('admin')
  @Permissions(ERole.ADMIN)
  findAllWithPagination(@Query() args: CategoriesPaginationDto) {
    return this.categoriesService.findAllWithPagination(args);
  }

  @Get('admin/leaf')
  @Permissions(ERole.ADMIN)
  findLeafCategories() {
    return this.categoriesService.findLeafCategories();
  }

  @Get('newest')
  @Auth(EAuth.NONE)
  findNewestCategories() {
    return this.categoriesService.findNewestCategories();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Permissions(ERole.ADMIN)
  deleteOne(@Param('id') id: string) {
    return this.categoriesService.deleteOne(+id);
  }
}

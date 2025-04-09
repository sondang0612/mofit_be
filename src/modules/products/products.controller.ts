import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { EApiPathName } from 'src/common/constants/api-path.enum';
import { EAuth } from 'src/common/constants/auth.enum';
import { Auth, Permissions } from '../auth/guards/global-auth.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductPaginationDto } from './dto/product-pagination.dto';
import { ProductsService } from './products.service';
import { ERole } from 'src/common/constants/role.enum';

@Controller({ path: EApiPathName.PRODUCTS })
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Permissions(ERole.ADMIN)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @Auth(EAuth.NONE)
  findAll(@Query() productPaginationDto: ProductPaginationDto) {
    return this.productsService.findAll(productPaginationDto);
  }

  @Get(':slug')
  @Auth(EAuth.NONE)
  findOne(@Param('slug') slug: string) {
    return this.productsService.findOne(slug);
  }
}

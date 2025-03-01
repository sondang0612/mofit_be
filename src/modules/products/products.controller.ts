import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { EApiPathName } from 'src/common/constants/api-path.enum';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductPaginationDto } from './dto/product-pagination.dto';
import { ProductsService } from './products.service';

@Controller({ path: EApiPathName.PRODUCTS })
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(@Query() productPaginationDto: ProductPaginationDto) {
    return this.productsService.findAll(productPaginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { EApiPathName } from 'src/common/constants/api-path.enum';
import { EAuth } from 'src/common/constants/auth.enum';
import { ERole } from 'src/common/constants/role.enum';
import { ExtractUser, UserParams } from 'src/common/decorators/user.decorator';
import { Auth, Permissions } from '../auth/guards/global-auth.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductPaginationDto } from './dto/product-pagination.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

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
  @Permissions(ERole.USER)
  findAll(@Query() productPaginationDto: ProductPaginationDto) {
    return this.productsService.findAll(productPaginationDto);
  }

  @Get('admin')
  @Permissions(ERole.ADMIN)
  findAllByAdmin(@Query() productPaginationDto: ProductPaginationDto) {
    return this.productsService.findAllByAdmin(productPaginationDto);
  }

  @Get(':slug')
  @Auth(EAuth.NONE)
  findOne(@Param('slug') slug: string) {
    return this.productsService.findOne(slug);
  }
  @Get('admin/:id')
  @Permissions(ERole.ADMIN)
  getById(@Param('id') id: number) {
    return this.productsService.findOneById(id);
  }

  @Delete(':id')
  @Permissions(ERole.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteOne(@Param('id') id: number, @ExtractUser() user: UserParams) {
    return this.productsService.deleteOne(id, user);
  }

  @Patch(':id')
  @Permissions(ERole.ADMIN)
  updateOne(@Body() args: UpdateProductDto) {
    return this.productsService.patchOne(args);
  }
}

import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { EApiPathName } from 'src/common/constants/api-path.enum';
import { ERole } from 'src/common/constants/role.enum';
import { Permissions } from '../auth/guards/global-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ProductPagination } from './dto/product-pagination.dto';

@Controller({ path: EApiPathName.USERS })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Permissions(ERole.ADMIN)
  findAll(@Query() productPagination: ProductPagination) {
    return this.usersService.findAll(productPagination);
  }
}

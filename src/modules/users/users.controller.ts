import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { EApiPathName } from 'src/common/constants/api-path.enum';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller({ path: EApiPathName.USERS })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('add-to-cart')
  @UseGuards(JwtAuthGuard)
  addToCart(@Request() req, @Body() addToCartDto: AddToCartDto) {
    return this.usersService.addToCart({
      ...addToCartDto,
      userId: req?.user?.id,
      userEmail: req?.user?.email,
    });
  }
}

import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CartItemsService } from './cart-items.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { EApiPathName } from 'src/common/constants/api-path.enum';

@Controller({ path: EApiPathName.CART_ITEMS })
@UseGuards(JwtAuthGuard)
export class CartItemsController {
  constructor(private readonly cartItemsService: CartItemsService) {}

  @Post()
  create(@Request() req, @Body() addToCartDto: CreateCartItemDto) {
    return this.cartItemsService.create({
      ...addToCartDto,
      userId: req?.user?.id,
      userEmail: req?.user?.email,
    });
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Request() req, @Param('id') id: number) {
    return this.cartItemsService.remove({
      userId: req?.user?.id,
      userEmail: req?.user?.email,
      cartItemId: id,
    });
  }
}

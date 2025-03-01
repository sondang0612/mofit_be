import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { EApiPathName } from 'src/common/constants/api-path.enum';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RemoveCartItemsDto } from './dto/remove-cart-items-dto';

@Controller(EApiPathName.CART)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  @UseGuards(JwtAuthGuard)
  addToCart(@Request() req, @Body() addToCartDto: AddToCartDto) {
    return this.cartService.addToCart({
      ...addToCartDto,
      userId: req?.user?.id,
    });
  }

  @Get('info')
  @UseGuards(JwtAuthGuard)
  getCartInfo(@Request() req) {
    return this.cartService.getCartInfo({ userId: req?.user?.id });
  }

  @Post('remove')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  removeCartItem(
    @Request() req,
    @Body() removeCartItemsDto: RemoveCartItemsDto,
  ) {
    return this.cartService.removeCartItem({
      ...removeCartItemsDto,
      userEmail: req?.userEmail,
      userId: req?.id,
    });
  }
}

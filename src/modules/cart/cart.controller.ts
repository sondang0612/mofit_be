import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { EApiPathName } from 'src/common/constants/api-path.enum';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AddToCartDto } from './dto/add-to-cart.dto';

@Controller({ path: EApiPathName.CART })
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getCartInfo(@Request() req) {
    return this.cartService.getMyCart({ userId: req?.user?.id });
  }

  @Post('me')
  @UseGuards(JwtAuthGuard)
  addToCart(@Request() req, @Body() addToCartDto: AddToCartDto) {
    return this.cartService.addToCart({
      ...addToCartDto,
      userId: req?.user?.id,
      userEmail: req?.user?.email,
    });
  }

  @Delete('/:cartItemId/me')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  removeMyCartItem(@Request() req, @Param('cartItemId') cartItemId: number) {
    return this.cartService.removeMyCartItem({
      userId: req?.user?.id,
      userEmail: req?.user?.email,
      cartItemId,
    });
  }
}

import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { EApiPathName } from 'src/common/constants/api-path.enum';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller({ path: EApiPathName.CART })
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getCartInfo(@Request() req) {
    return this.cartService.getMyCart({ userId: req?.user?.id });
  }
}

import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { EApiPathName } from 'src/common/constants/api-path.enum';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CartService } from './cart.service';

@Controller({ path: EApiPathName.CART })
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  findOne(@Request() req) {
    return this.cartService.getMyCart({ userId: req?.user?.id });
  }
}

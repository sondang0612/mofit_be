import { Controller, Get } from '@nestjs/common';
import { EApiPathName } from 'src/common/constants/api-path.enum';
import { ERole } from 'src/common/constants/role.enum';
import { GetUser, UserParams } from 'src/common/decorators/user.decorator';
import { Permissions } from '../auth/guards/global-auth.guard';
import { CartService } from './cart.service';

@Controller({ path: EApiPathName.CART })
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @Permissions(ERole.USER)
  findOne(@GetUser() user: UserParams) {
    return this.cartService.getMyCart({ userId: user?.id });
  }
}

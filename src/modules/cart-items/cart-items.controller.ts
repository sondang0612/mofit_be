import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { EApiPathName } from 'src/common/constants/api-path.enum';
import { ERole } from 'src/common/constants/role.enum';
import { ExtractUser, UserParams } from 'src/common/decorators/user.decorator';
import { Permissions } from '../auth/guards/global-auth.guard';
import { CartItemsService } from './cart-items.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Controller({ path: EApiPathName.CART_ITEMS })
export class CartItemsController {
  constructor(private readonly cartItemsService: CartItemsService) {}

  @Post()
  @Permissions(ERole.USER)
  create(
    @ExtractUser() user: UserParams,
    @Body() addToCartDto: CreateCartItemDto,
  ) {
    return this.cartItemsService.create({
      ...addToCartDto,
      userId: user?.id,
      userEmail: user?.email,
    });
  }

  @Patch()
  @Permissions(ERole.USER)
  update(
    @ExtractUser() user: UserParams,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ) {
    return this.cartItemsService.update(updateCartItemDto, user);
  }

  @Delete('/:id')
  @Permissions(ERole.USER)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@ExtractUser() user: UserParams, @Param('id') id: number) {
    return this.cartItemsService.remove({
      userId: user?.id,
      userEmail: user?.email,
      cartItemId: id,
    });
  }
}

import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { EApiPathName } from 'src/common/constants/api-path.enum';
import { ERole } from 'src/common/constants/role.enum';
import { ExtractUser, UserParams } from 'src/common/decorators/user.decorator';
import { Permissions } from '../auth/guards/global-auth.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderPaginationDto } from './dto/order-pagination.dto';
import { OrdersService } from './orders.service';

@Controller({ path: EApiPathName.ORDERS })
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @Permissions(ERole.USER)
  findAll(@ExtractUser() user: UserParams, @Query() args: OrderPaginationDto) {
    return this.ordersService.findAll(args, user);
  }

  @Get(':id')
  @Permissions(ERole.ADMIN, ERole.USER)
  findOne(@ExtractUser() user: UserParams, @Param('id') id: string) {
    return this.ordersService.findOne(+id, user);
  }

  @Get(':id/timeline')
  @Permissions(ERole.ADMIN, ERole.USER)
  findOrderTimeLine(@ExtractUser() user: UserParams, @Param('id') id: string) {
    return this.ordersService.findOrderTimeLine(+id, user);
  }

  @Post()
  @Permissions(ERole.USER)
  create(
    @ExtractUser() user: UserParams,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    return this.ordersService.create(user, createOrderDto);
  }
}

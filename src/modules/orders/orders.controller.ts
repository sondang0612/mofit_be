import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { EApiPathName } from 'src/common/constants/api-path.enum';
import { ERole } from 'src/common/constants/role.enum';
import { GetUser, UserParams } from 'src/common/decorators/user.decorator';
import { Permissions } from '../auth/guards/global-auth.guard';
import { OrderPaginationDto } from './dto/order-pagination.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersService } from './orders.service';

@Controller({ path: EApiPathName.ORDERS })
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @Permissions(ERole.USER, ERole.ADMIN)
  findAll(
    @GetUser() user: UserParams,
    @Query() orderPaginationDto: OrderPaginationDto,
  ) {
    return this.ordersService.findAll(user, orderPaginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }

  @Post()
  @Permissions(ERole.USER)
  create(@GetUser() user: UserParams, @Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create({
      ...createOrderDto,
      userId: user?.id,
      userEmail: user?.email,
    });
  }
}

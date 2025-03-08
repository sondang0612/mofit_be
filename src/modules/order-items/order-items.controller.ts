import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { EApiPathName } from 'src/common/constants/api-path.enum';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { OrderItemsService } from './order-items.service';

@Controller({ path: EApiPathName.ORDER_ITEMS })
export class OrderItemsController {
  constructor(private readonly orderItemsService: OrderItemsService) {}

  @Post()
  create(@Body() createOrderItemDto: CreateOrderItemDto) {
    return this.orderItemsService.create(createOrderItemDto);
  }

  @Get()
  findAll() {
    return this.orderItemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderItemsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrderItemDto: UpdateOrderItemDto,
  ) {
    return this.orderItemsService.update(+id, updateOrderItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderItemsService.remove(+id);
  }
}

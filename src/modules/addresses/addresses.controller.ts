import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { EApiPathName } from 'src/common/constants/api-path.enum';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AddressesService } from './addresses.service';
import { AddressPaginationDto } from './dto/address-pagination.dto';
import { CreateAddressDto } from './dto/create-address.dto';

@Controller({ path: EApiPathName.ADDRESSES })
@UseGuards(JwtAuthGuard)
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Post()
  create(@Request() req, @Body() createAddressDto: CreateAddressDto) {
    return this.addressesService.create({
      ...createAddressDto,
      userId: req?.user?.id,
      userEmail: req?.user?.email,
    });
  }

  @Get()
  findAll(@Request() req, @Query() addressPaginationDto: AddressPaginationDto) {
    return this.addressesService.findAll({
      ...addressPaginationDto,
      limit: 50,
      userId: req?.user?.id,
    });
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Request() req, @Param('id') id: number) {
    return this.addressesService.deleteMyAddress(
      id,
      req?.user?.id,
      req?.user?.userEmail,
    );
  }

  @Patch('/:addressId/default')
  setDefaultAddress(@Request() req, @Param('addressId') addressId: number) {
    return this.addressesService.setDefaultAddress({
      addressId,
      userEmail: req?.user?.email,
      userId: req?.user?.id,
    });
  }
}

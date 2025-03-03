import {
  Body,
  Controller,
  Get,
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
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Request() req, @Body() createAddressDto: CreateAddressDto) {
    return this.addressesService.create({
      ...createAddressDto,
      userId: req?.user?.id,
      userEmail: req?.user?.email,
    });
  }

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  getMyAddresses(
    @Request() req,
    @Query() addressPaginationDto: AddressPaginationDto,
  ) {
    return this.addressesService.findAll({
      ...addressPaginationDto,
      userId: req?.user?.id,
    });
  }
}

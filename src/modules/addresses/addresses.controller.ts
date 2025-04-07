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
} from '@nestjs/common';
import { EApiPathName } from 'src/common/constants/api-path.enum';
import { ERole } from 'src/common/constants/role.enum';
import { ExtractUser, UserParams } from 'src/common/decorators/user.decorator';
import { Permissions } from '../auth/guards/global-auth.guard';
import { AddressesService } from './addresses.service';
import { AddressPaginationDto } from './dto/address-pagination.dto';
import { CreateAddressDto } from './dto/create-address.dto';

@Controller({ path: EApiPathName.ADDRESSES })
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Post()
  @Permissions(ERole.USER)
  create(
    @ExtractUser() user: UserParams,
    @Body() createAddressDto: CreateAddressDto,
  ) {
    return this.addressesService.create({
      ...createAddressDto,
      userId: user?.id,
      userEmail: user?.email,
    });
  }

  @Get()
  @Permissions(ERole.ADMIN, ERole.USER)
  findAll(
    @ExtractUser() user: UserParams,
    @Query() addressPaginationDto: AddressPaginationDto,
  ) {
    return this.addressesService.findAll(addressPaginationDto, user);
  }

  @Delete('/:id')
  @Permissions(ERole.USER)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@ExtractUser() user: UserParams, @Param('id') id: number) {
    return this.addressesService.deleteMyAddress(id, user?.id, user?.email);
  }

  @Patch('/:addressId/default')
  @Permissions(ERole.USER)
  setDefaultAddress(
    @ExtractUser() user: UserParams,
    @Param('addressId') addressId: number,
  ) {
    return this.addressesService.setDefaultAddress({
      addressId,
      userEmail: user?.email,
      userId: user?.id,
    });
  }
}

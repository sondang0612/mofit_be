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
import { GetUser, UserParams } from 'src/common/decorators/user.decorator';
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
    @GetUser() user: UserParams,
    @Body() createAddressDto: CreateAddressDto,
  ) {
    return this.addressesService.create({
      ...createAddressDto,
      userId: user?.id,
      userEmail: user?.email,
    });
  }

  @Get()
  @Permissions(ERole.USER, ERole.ADMIN)
  findAll(@Query() addressPaginationDto: AddressPaginationDto) {
    return this.addressesService.findAll({
      ...addressPaginationDto,
      limit: 50,
    });
  }

  @Delete('/:id')
  @Permissions(ERole.USER)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@GetUser() user: UserParams, @Param('id') id: number) {
    return this.addressesService.deleteMyAddress(id, user?.id, user?.email);
  }

  @Patch('/:addressId/default')
  @Permissions(ERole.USER)
  setDefaultAddress(
    @GetUser() user: UserParams,
    @Param('addressId') addressId: number,
  ) {
    return this.addressesService.setDefaultAddress({
      addressId,
      userEmail: user?.email,
      userId: user?.id,
    });
  }
}

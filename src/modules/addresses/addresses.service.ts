import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from 'src/database/entities/address.entity';
import { TypeOrmBaseService } from 'src/database/services/typeorm-base.service';
import { Repository } from 'typeorm';
import { AddressPaginationDto } from './dto/address-pagination.dto';
import { UserParams } from 'src/common/decorators/user.decorator';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class AddressesService extends TypeOrmBaseService<Address> {
  constructor(
    @InjectRepository(Address)
    private readonly addressesRepository: Repository<Address>,
  ) {
    super(addressesRepository);
  }

  async create(args: CreateAddressDto, user: UserParams) {
    const {
      city,
      district,
      firstName,
      lastName,
      note,
      streetAddress,
      isDefault,
      phoneNumber,
    } = args;

    if (isDefault) {
      await this.addressesRepository.update(
        { user: { id: user.id }, isDefault: true, isDeleted: false },
        { isDefault: false },
      );
    }

    await this._create(
      {
        city,
        district,
        firstName,
        lastName,
        note,
        streetAddress,
        user: { id: user.id },
        isDefault,
        phoneNumber,
      },
      { userEmail: user.email },
    );

    return {
      message: 'Created successfully',
    };
  }

  async findAll(args: AddressPaginationDto, user: UserParams) {
    const { limit, page, sortBy, sort } = args;

    const queryBuilder = this.addressesRepository
      .createQueryBuilder(this.entityName)
      .leftJoinAndSelect(`${this.entityName}.user`, 'user')
      .where(`${this.entityName}.userId = :userId`, {
        userId: user.id,
      });

    queryBuilder.orderBy(`${this.entityName}.isDefault`, 'DESC');

    const data = await this._findAll(queryBuilder, {
      limit,
      page,
      sort: {
        field: sortBy,
        order: sort,
      },
    });

    return {
      message: 'Get all successfully!!',
      data,
    };
  }

  async deleteMyAddress(id: number, user: UserParams) {
    const address = await this._findOneOrFail({
      where: { id, user: { id: user.id, email: user.email, isDeleted: false } },
    });

    if (address.isDefault) {
      throw new BadRequestException('Can not delete default address!!');
    }

    await this._softDelete(address.id, user.email);

    return null;
  }

  async updateMyAddress(args: UpdateAddressDto, user: UserParams) {
    const { id, ...updateData } = args;

    const address = await this.repository.findOne({
      where: { id, user: { id: user.id } },
    });

    if (!address) {
      throw new NotFoundException(
        'Address not found or not belong to the user',
      );
    }

    const updated = this.repository.merge(address, updateData);
    const updatedData = await this.repository.save(updated);

    return {
      message: 'Updated Address Successfull!!',
      data: instanceToPlain(updatedData),
    };
  }

  async setDefaultAddress(addressId: number, user: UserParams) {
    return this.addressesRepository.manager.connection.transaction(
      async (manager) => {
        const addressRepo = manager.getRepository(Address);

        const address = await addressRepo.findOneOrFail({
          where: {
            id: addressId,
            user: { id: user.id, email: user.email, isDeleted: false },
          },
        });

        if (!address.isDefault) {
          await addressRepo.update(
            { user: { id: user.id }, isDefault: true, isDeleted: false },
            { isDefault: false },
          );

          address.isDefault = true;
          await addressRepo.save(address);
        }

        return address;
      },
    );
  }
}

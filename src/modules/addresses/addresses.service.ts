import { BadRequestException, Injectable } from '@nestjs/common';
import { AddressesRepository } from './addresses.repository';
import { AddressPaginationDto } from './dto/address-pagination.dto';
import { Address } from 'src/database/entities/address.entity';

@Injectable()
export class AddressesService {
  constructor(private readonly addressesRepository: AddressesRepository) {}

  async create(args: {
    firstName: string;
    lastName: string;
    city: string;
    district: string;
    streetAddress: string;
    note: string;
    userId: number;
    userEmail: string;
    phoneNumber: string;
    isDefault: boolean;
  }) {
    const {
      city,
      district,
      firstName,
      lastName,
      note,
      streetAddress,
      userEmail,
      userId,
      isDefault,
      phoneNumber,
    } = args;

    if (isDefault) {
      await this.addressesRepository.update(
        { user: { id: userId }, isDefault: true, isDeleted: false },
        { isDefault: false },
      );
    }

    await this.addressesRepository._create(
      {
        city,
        district,
        firstName,
        lastName,
        note,
        streetAddress,
        user: { id: userId },
        isDefault,
        phoneNumber,
      },
      { userEmail },
    );

    return {
      message: 'Created successfully',
    };
  }

  async findAll(args: AddressPaginationDto & { userId: number }) {
    const { limit, page, sortBy, sort, userId } = args;

    const queryBuilder = this.addressesRepository
      .createQueryBuilder(this.addressesRepository.entityName)
      .leftJoinAndSelect(`${this.addressesRepository.entityName}.user`, 'user')
      .where(`${this.addressesRepository.entityName}.userId = :userId`, {
        userId,
      })
      .orderBy(`${this.addressesRepository.entityName}.isDefault`, 'DESC');

    const data = await this.addressesRepository._findAll(queryBuilder, {
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

  async deleteMyAddress(id: number, userId: number, userEmail: string) {
    const address = await this.addressesRepository._findOneOrFail({
      where: { id, user: { id: userId, email: userEmail, isDeleted: false } },
    });

    if (address.isDefault) {
      throw new BadRequestException('Can not delete default address!!');
    }

    await this.addressesRepository._softDelete(address.id, userEmail);

    return null;
  }

  async setDefaultAddress(args: {
    userId: number;
    userEmail: string;
    addressId: number;
  }) {
    const { addressId, userEmail, userId } = args;

    return this.addressesRepository.manager.connection.transaction(
      async (manager) => {
        const addressRepo = manager.getRepository(Address);

        const address = await addressRepo.findOneOrFail({
          where: {
            id: addressId,
            user: { id: userId, email: userEmail, isDeleted: false },
          },
        });

        if (!address.isDefault) {
          await addressRepo.update(
            { user: { id: userId }, isDefault: true, isDeleted: false },
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

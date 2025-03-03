import { Injectable } from '@nestjs/common';
import { AddressesRepository } from './addresses.repository';
import { AddressPaginationDto } from './dto/address-pagination.dto';

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
      });

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
}

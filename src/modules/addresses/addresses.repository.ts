import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from 'src/database/entities/address.entity';
import { BaseRepository } from 'src/database/repositories/base.repository';
import { Repository } from 'typeorm';

@Injectable()
export class AddressesRepository extends BaseRepository<Address> {
  constructor(@InjectRepository(Address) repository: Repository<Address>) {
    super(Address, repository);
  }
}

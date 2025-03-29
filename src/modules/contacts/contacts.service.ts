import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { TypeOrmBaseService } from 'src/database/services/typeorm-base.service';
import { Contact } from 'src/database/entities/contact.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ContactsService extends TypeOrmBaseService<Contact> {
  constructor(
    @InjectRepository(Contact)
    private readonly contactsRepository: Repository<Contact>,
  ) {
    super(contactsRepository);
  }

  async create(createContactDto: CreateContactDto) {
    const contact = await this._create(createContactDto, {
      userEmail: createContactDto.email,
    });
    return {
      message: 'Create contact successfully!!',
      data: contact,
    };
  }

  findAll() {
    return `This action returns all contacts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contact`;
  }

  update(id: number, updateContactDto: UpdateContactDto) {
    return `This action updates a #${id} contact`;
  }

  remove(id: number) {
    return `This action removes a #${id} contact`;
  }
}

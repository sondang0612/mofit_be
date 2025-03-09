import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from 'src/database/entities/payment.entity';
import { BaseRepository } from 'src/database/repositories/base.repository';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentsRepository extends BaseRepository<Payment> {
  constructor(@InjectRepository(Payment) repository: Repository<Payment>) {
    super(Payment, repository);
  }
}

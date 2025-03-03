import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { AddressesController } from './addresses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from 'src/database/entities/address.entity';
import { AddressesRepository } from './addresses.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Address])],
  controllers: [AddressesController],
  providers: [AddressesService, AddressesRepository],
  exports: [AddressesRepository],
})
export class AddressesModule {}

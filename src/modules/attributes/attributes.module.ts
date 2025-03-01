import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attribute } from 'src/database/entities/attribute.entity';
import { AttributesController } from './attributes.controller';
import { AttributesService } from './attributes.service';
import { AttributesRepository } from './attributes.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Attribute])],
  controllers: [AttributesController],
  providers: [AttributesService, AttributesRepository],
  exports: [AttributesRepository],
})
export class AttributesModule {}

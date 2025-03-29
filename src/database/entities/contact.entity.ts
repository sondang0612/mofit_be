import { ETableName } from 'src/common/constants/table-name.enum';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity(ETableName.CONTACT)
export class Contact extends BaseEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column('text')
  message: string;

  @Column({ default: false })
  isProcessed: boolean;
}

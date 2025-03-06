import { ETableName } from 'src/common/constants/table-name.enum';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity(ETableName.ADDRESS)
export class Address extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  city: string;

  @Column()
  district: string;

  @Column()
  streetAddress: string;

  @Column()
  note: string;

  @Column({ default: false })
  isDefault: boolean;

  @Column({ nullable: true })
  phoneNumber: string;

  @ManyToOne(() => User, (user) => user.addresses)
  user: User;
}

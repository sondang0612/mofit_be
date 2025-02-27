import { ETableName } from 'src/common/constants/table-name.enum';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity(ETableName.USERS)
export class User extends BaseEntity {
  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phoneNumber: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;
}

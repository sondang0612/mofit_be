import { Exclude } from 'class-transformer';
import { EGender } from 'src/common/constants/gender.enum';
import { ERole } from 'src/common/constants/role.enum';
import { ETableName } from 'src/common/constants/table-name.enum';
import { Column, Entity, OneToMany } from 'typeorm';
import { Address } from './address.entity';
import { BaseEntity } from './base.entity';
import { CartItem } from './cart-item.entity';
import { Order } from './order.entity';
import { Payment } from './payment.entity';
import { EUserDeleteRequestStatus } from 'src/common/constants/user-delete-request-status.enum';
import { ProductLike } from './product-like.entity';

@Entity(ETableName.USER)
export class User extends BaseEntity {
  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phoneNumber: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  birthday: string;

  @Column({ type: 'enum', enum: EGender, default: EGender.OTHER })
  gender: EGender;

  @Column({ type: 'enum', enum: ERole, default: ERole.USER })
  role: ERole;

  @OneToMany(() => CartItem, (cartItem) => cartItem.user)
  cartItems: CartItem[];

  @OneToMany(() => Address, (address) => address.user)
  addresses: Address[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => Payment, (payment) => payment.user)
  payments: Payment[];

  @Column({
    type: 'enum',
    enum: EUserDeleteRequestStatus,
    default: EUserDeleteRequestStatus.NONE,
  })
  deletionStatus: EUserDeleteRequestStatus;

  @OneToMany(() => ProductLike, (productLike) => productLike.user)
  likedProducts: ProductLike[];
}

import { ETableName } from 'src/common/constants/table-name.enum';
import { Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { CartItem } from './cart-item.entity';
import { User } from './user.entity';

@Entity(ETableName.CART)
export class Cart extends BaseEntity {
  @ManyToOne(() => User, (user) => user.carts)
  user: User;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
  items: CartItem[];
}

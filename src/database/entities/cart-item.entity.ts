import { ETableName } from 'src/common/constants/table-name.enum';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Product } from './product.entity';
import { User } from './user.entity';

@Entity(ETableName.CART_ITEM)
export class CartItem extends BaseEntity {
  @ManyToOne(() => User, (user) => user.cartItems)
  user: User;

  @ManyToOne(() => Product)
  product: Product;

  @Column()
  quantity: number;
}

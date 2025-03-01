import { ETableName } from 'src/common/constants/table-name.enum';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Product } from './product.entity';
import { Cart } from './cart.entity';

@Entity(ETableName.CART_ITEM)
export class CartItem extends BaseEntity {
  @ManyToOne(() => Cart, (cart) => cart.items)
  cart: Cart;

  @ManyToOne(() => Product)
  product: Product;

  @Column()
  quantity: number;
}

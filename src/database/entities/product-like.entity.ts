import { ETableName } from 'src/common/constants/table-name.enum';
import { Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Product } from './product.entity';
import { User } from './user.entity';

@Entity(ETableName.PRODUCT_LIKE)
export class ProductLike extends BaseEntity {
  @ManyToOne(() => User, (user) => user.likedProducts)
  user: User;

  @ManyToOne(() => Product, (product) => product.likes)
  product: Product;
}

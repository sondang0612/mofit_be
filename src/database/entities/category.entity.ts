import { ETableName } from 'src/common/constants/table-name.enum';
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Product } from './product.entity';

@Entity({ name: ETableName.CATEGORY })
export class Category extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}

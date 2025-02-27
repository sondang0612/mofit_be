import { ETableName } from 'src/common/constants/table-name.enum';
import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Product } from './product.entity';

@Entity({ name: ETableName.ATTIRBUTE })
export class Attribute extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ManyToMany(() => Product, (product) => product.attributes)
  products: Product[];
}

import { ETableName } from 'src/common/constants/table-name.enum';
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Product } from './product.entity';

@Entity(ETableName.DISCOUNT)
export class Discount extends BaseEntity {
  @Column({ type: 'decimal', precision: 10, scale: 0 })
  percentage: number;

  @Column({ type: 'timestamp', nullable: true })
  startDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  endDate: Date;

  @OneToMany(() => Product, (product) => product.discount)
  products: Product[];
}

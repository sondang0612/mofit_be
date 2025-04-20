import { ETableName } from 'src/common/constants/table-name.enum';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Category } from './category.entity';
import { Attribute } from './attribute.entity';
import { Discount } from './discount.entity';
import { Brand } from './brand.entity';
import { Transform } from 'class-transformer';
import { ProductLike } from './product-like.entity';

@Entity(ETableName.PRODUCT)
export class Product extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255 })
  slug: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @Transform(({ value }) => parseFloat(value))
  price: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  imgSrc: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  imgSrc2: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  shortDescription: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  sku: string;

  @Column({
    nullable: true,
    type: 'decimal',
    precision: 2,
    scale: 1,
    default: 0,
  })
  ratings: number;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToMany(() => Attribute, (attribute) => attribute.products)
  @JoinTable({
    name: 'product_attributes',
    joinColumn: { name: 'product_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'attribute_id', referencedColumnName: 'id' },
  })
  attributes: Attribute[];

  @ManyToOne(() => Discount, (discount) => discount.products, {
    nullable: true,
  })
  @JoinColumn({ name: 'discount_id' })
  discount: Discount;

  @ManyToOne(() => Brand, (brand) => brand.products)
  brand: Brand;

  @OneToMany(() => ProductLike, (productLike) => productLike.product)
  likes: ProductLike[];
}

import { Transform } from 'class-transformer';
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
import { Attribute } from './attribute.entity';
import { BaseEntity } from './base.entity';
import { Brand } from './brand.entity';
import { Category } from './category.entity';
import { Discount } from './discount.entity';
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
  shortDescription: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  sku: string;

  @Column({ type: 'varchar', length: 255 })
  origin: string;

  @Column({ type: 'varchar', nullable: true })
  specifications: string;

  @Column({ type: 'jsonb', nullable: true })
  images: Record<string, any>; // cover and normal

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToMany(() => Attribute, (attribute) => attribute.products)
  @JoinTable({
    name: 'product_attributes',
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

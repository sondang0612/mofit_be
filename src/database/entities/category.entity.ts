import { ETableName } from 'src/common/constants/table-name.enum';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Product } from './product.entity';

@Entity({ name: ETableName.CATEGORY })
export class Category extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  slug: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  @OneToMany(() => Category, (subCategory) => subCategory.parentCategory)
  subCategories: Category[];

  @ManyToOne(() => Category, (category) => category.subCategories)
  parentCategory: Category | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  imgSrc: string;
}

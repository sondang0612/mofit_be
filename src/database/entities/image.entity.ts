// image.entity.ts
import { EImageTargetType } from 'src/common/constants/image-target-type.enum';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Exclude } from 'class-transformer';
import { ETableName } from 'src/common/constants/table-name.enum';

@Entity(ETableName.IMAGES)
export class Image extends BaseEntity {
  @Column()
  url: string;

  @Exclude()
  @Column({ type: 'enum', enum: EImageTargetType })
  targetType: EImageTargetType;

  @Exclude()
  @Column()
  targetId: number;
}

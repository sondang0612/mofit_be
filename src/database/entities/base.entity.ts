// base.entity.ts
import { Exclude } from 'class-transformer';
import { EDefaultEmail } from 'src/common/constants/default-email.enum';
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Exclude()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Exclude()
  @Column({ default: false })
  isDeleted: boolean;

  @Exclude()
  @Column({ default: EDefaultEmail.SYSTEM_GENERATED })
  createdBy: string;
}

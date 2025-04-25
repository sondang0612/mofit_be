import { ETableName } from 'src/common/constants/table-name.enum';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { Order } from './order.entity';
import { EPaymentStatus } from 'src/common/constants/order.enum';
import { Exclude } from 'class-transformer';

@Entity(ETableName.PAYMENT)
export class Payment extends BaseEntity {
  @ManyToOne(() => User, (user) => user.payments)
  user: User;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalPrice: number;

  @Column({
    type: 'enum',
    enum: EPaymentStatus,
    default: EPaymentStatus.PENDING,
  })
  status: EPaymentStatus;

  @OneToOne(() => Order)
  @JoinColumn()
  order: Order;

  @Exclude()
  @Column({ type: 'jsonb', nullable: true })
  details: Record<string, any>;
}

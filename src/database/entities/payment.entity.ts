import { ETableName } from 'src/common/constants/table-name.enum';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { Order } from './order.entity';

@Entity(ETableName.PAYMENT)
export class Payment extends BaseEntity {
  @ManyToOne(() => User, (user) => user.payments)
  user: User;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalPrice: number;

  @Column({ nullable: true })
  bank: string;

  @Column({ nullable: true })
  cardType: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  transactionId: string;

  @OneToOne(() => Order)
  @JoinColumn()
  order: Order;
}

import { ETableName } from 'src/common/constants/table-name.enum';
import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { OrderItem } from './order-item.entity';
import { User } from './user.entity';
import {
  EOrderStatus,
  EPaymentMethod,
  EShippingMethod,
} from 'src/common/constants/order.enum';
import { Payment } from './payment.entity';
import { Transform } from 'class-transformer';

@Entity(ETableName.ORDER)
export class Order extends BaseEntity {
  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @Column({
    type: 'enum',
    enum: EShippingMethod,
    default: EShippingMethod.OWN_DELIVERY,
  })
  shippingMethod: EShippingMethod;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  @Transform(({ value }) => parseFloat(value))
  shippingPrice: number;

  @Column({ type: 'enum', enum: EPaymentMethod, default: EPaymentMethod.COD })
  paymentMethod: EPaymentMethod;

  @Column()
  discount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @Transform(({ value }) => parseFloat(value))
  vat: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @Transform(({ value }) => parseFloat(value))
  subTotal: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @Transform(({ value }) => parseFloat(value))
  totalPrice: number;

  @Column({
    type: 'enum',
    enum: EOrderStatus,
    default: EOrderStatus.PENDING,
    enumName: 'order_status_enum',
  })
  status: EOrderStatus;

  @Column({ type: 'jsonb' })
  address: Record<string, any>;

  @OneToOne(() => Payment, (payment) => payment.order)
  payment: Payment;

  @Column({ unique: true })
  txnRef: string;

  @Column({ type: 'jsonb', nullable: true })
  cart: Record<string, any>;
}

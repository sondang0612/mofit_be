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
  shippingPrice: number;

  @Column({ type: 'enum', enum: EPaymentMethod, default: EPaymentMethod.COD })
  paymentMethod: EPaymentMethod;

  @Column()
  discount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  vat: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  subTotal: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalPrice: number;

  @Column({ type: 'enum', enum: EOrderStatus, default: EOrderStatus.PENDING })
  orderStatus: EOrderStatus;

  @Column({ type: 'jsonb' })
  address: Record<string, any>;

  @OneToOne(() => Payment, (payment) => payment.order)
  payment: Payment;
}

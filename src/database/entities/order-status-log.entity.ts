import { EOrderStatus } from 'src/common/constants/order.enum';
import { ETableName } from 'src/common/constants/table-name.enum';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Order } from './order.entity';

@Entity(ETableName.ORDER_STATUS_LOG)
export class OrderStatusLog extends BaseEntity {
  @ManyToOne(() => Order, (order) => order.orderItems)
  order: Order;

  @Column({
    type: 'enum',
    enum: EOrderStatus,
    nullable: true,
    enumName: 'order_status_enum',
  })
  previousStatus: EOrderStatus;

  @Column({
    type: 'enum',
    enum: EOrderStatus,
    enumName: 'order_status_enum',
  })
  currentStatus: EOrderStatus;

  @Column()
  time: Date;
}

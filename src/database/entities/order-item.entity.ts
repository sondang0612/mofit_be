import { ETableName } from 'src/common/constants/table-name.enum';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Order } from './order.entity';

@Entity(ETableName.ORDER_ITEM)
export class OrderItem extends BaseEntity {
  @ManyToOne(() => Order, (order) => order.orderItems)
  order: Order;

  @Column({ type: 'jsonb' })
  product: Record<string, any>;

  @Column()
  quantity: number;
}

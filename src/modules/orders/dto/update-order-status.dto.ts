import { IsEnum } from 'class-validator';
import { EOrderStatus } from 'src/common/constants/order.enum';

export class UpdateOrderStatusDto {
  @IsEnum(EOrderStatus)
  status?: EOrderStatus;
}

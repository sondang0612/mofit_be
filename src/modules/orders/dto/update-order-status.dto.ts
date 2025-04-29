import { IsEnum, IsOptional } from 'class-validator';
import { EOrderStatus, EPaymentStatus } from 'src/common/constants/order.enum';

export class UpdateOrderStatusDto {
  @IsEnum(EOrderStatus)
  @IsOptional()
  status?: EOrderStatus;

  @IsEnum(EOrderStatus)
  @IsOptional()
  paymentStatus?: EPaymentStatus;
}

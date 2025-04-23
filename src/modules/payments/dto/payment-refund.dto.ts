import { IsNumber } from 'class-validator';

export class PaymentRefundDto {
  @IsNumber()
  orderId: number;
}

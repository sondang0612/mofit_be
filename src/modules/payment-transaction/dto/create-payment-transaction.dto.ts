import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePaymentTransactionDto {
  @IsString()
  @IsNotEmpty()
  orderInfo: string;

  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;
}

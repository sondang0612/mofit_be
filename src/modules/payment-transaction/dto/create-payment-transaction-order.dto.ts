import { IsNotEmpty } from 'class-validator';
import { CreateOrderDto } from 'src/modules/orders/dto/create-order.dto';

export class CreatePaymentTransactionOrderDto extends CreateOrderDto {
  @IsNotEmpty()
  query: any;
}

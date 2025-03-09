import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { EPaymentMethod } from 'src/common/constants/order.enum';

export class CreateOrderDto {
  @IsArray()
  cartItemIds: number[];

  @IsString()
  @IsNotEmpty()
  shippingMethod: string;

  @IsNumber()
  @IsNotEmpty()
  shippingPrice: number;

  @IsEnum(EPaymentMethod)
  paymentMethod: EPaymentMethod;

  @IsNumber()
  @IsNotEmpty()
  discount: number;

  @IsNumber()
  @IsNotEmpty()
  vat: number;

  @IsNumber()
  @IsNotEmpty()
  addressId: number;

  @IsNumber()
  @IsNotEmpty()
  subTotal: number;

  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;
}

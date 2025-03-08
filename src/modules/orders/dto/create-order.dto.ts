import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsArray()
  cartItemIds: number[];

  @IsString()
  @IsNotEmpty()
  shippingMethod: string;

  @IsNumber()
  @IsNotEmpty()
  shippingPrice: number;

  @IsString()
  @IsNotEmpty()
  paymentMethod: string;

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

import { IsNumber } from 'class-validator';

export class LikeProductDto {
  @IsNumber()
  productId: number;
}

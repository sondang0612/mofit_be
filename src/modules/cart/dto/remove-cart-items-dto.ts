import { IsArray } from 'class-validator';

export class RemoveCartItemsDto {
  @IsArray()
  cartItemIds: number[];
}

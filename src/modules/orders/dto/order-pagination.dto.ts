import { IsEnum, IsOptional, IsString } from 'class-validator';
import { EOrderStatus } from 'src/common/constants/order.enum';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

export class OrderPaginationDto extends PaginationDto {
  @IsOptional()
  @IsString()
  txnRef?: string;

  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsEnum(EOrderStatus)
  status?: EOrderStatus;

  @IsOptional()
  @IsString()
  productTitle?: string;

  @IsOptional()
  @IsString()
  orderId?: string;

  @IsOptional()
  @IsString()
  q?: string;
}

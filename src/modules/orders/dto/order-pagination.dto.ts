import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

export class OrderPaginationDto extends PaginationDto {
  @IsOptional()
  @IsString()
  txnRef?: string;

  @IsOptional()
  @IsString()
  userId?: string;
}

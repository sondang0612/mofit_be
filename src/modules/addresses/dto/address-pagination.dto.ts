import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

export class AddressPaginationDto extends PaginationDto {
  @IsOptional()
  @IsString()
  userId?: string;
}

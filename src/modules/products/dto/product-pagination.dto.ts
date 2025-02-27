import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

export class ProductPaginationDto extends PaginationDto {
  @IsOptional()
  @IsString()
  attributeName?: string;
}

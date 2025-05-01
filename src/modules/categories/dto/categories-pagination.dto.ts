import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

export class CategoriesPaginationDto extends PaginationDto {
  @IsOptional()
  @IsString()
  q?: string;
}

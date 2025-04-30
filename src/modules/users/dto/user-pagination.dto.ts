import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ERole } from 'src/common/constants/role.enum';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

export class UserPagination extends PaginationDto {
  @IsOptional()
  @IsEnum(ERole)
  role?: ERole;

  @IsOptional()
  @IsString()
  q?: string;
}

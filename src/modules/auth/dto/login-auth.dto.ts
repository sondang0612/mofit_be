import { IsEnum, IsString, MinLength } from 'class-validator';
import { ERole } from 'src/common/constants/role.enum';

export class LoginAuthDto {
  @IsString()
  username: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsEnum(ERole)
  role: ERole = ERole.USER;
}

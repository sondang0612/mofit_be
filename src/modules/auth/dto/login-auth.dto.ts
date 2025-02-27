import { IsOptional, IsString, MinLength } from 'class-validator';

export class LoginAuthDto {
  @IsString()
  @MinLength(6)
  username: string;

  @IsString()
  @MinLength(6)
  password: string;
}

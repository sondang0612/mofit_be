import {
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateProfileDto {
  @IsPhoneNumber('VN')
  phoneNumber: string;

  @IsString()
  @IsOptional()
  @MinLength(6)
  currentPassword: string;

  @IsString()
  @IsOptional()
  @MinLength(6)
  newPassword: string;

  @IsString()
  @MinLength(2)
  firstName: string;

  @IsString()
  @MinLength(2)
  lastName: string;
}

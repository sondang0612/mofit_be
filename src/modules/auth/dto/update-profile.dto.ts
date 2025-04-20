import {
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { EGender } from 'src/common/constants/gender.enum';

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

  @IsString()
  @IsOptional()
  birthday: string;

  @IsOptional()
  @IsEnum(EGender)
  gender: EGender;
}

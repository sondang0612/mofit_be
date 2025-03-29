import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateContactDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  message: string;

  @IsOptional()
  @IsBoolean()
  isProcessed?: boolean;
}

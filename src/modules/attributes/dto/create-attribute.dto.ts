import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAttributeDto {
  @IsString()
  @IsNotEmpty({ message: 'Category name cannot be empty' })
  name: string;
}

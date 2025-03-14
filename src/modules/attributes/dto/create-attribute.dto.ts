import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAttributeDto {
  @IsString()
  @IsNotEmpty({ message: 'Category name cannot be empty' })
  label: string;
}

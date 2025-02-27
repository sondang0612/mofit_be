import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty({ message: 'Product name cannot be empty' })
  title: string;

  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Price must be a valid number with maximum 2 decimal places' },
  )
  @IsPositive({ message: 'Price must be a positive number' })
  @IsNotEmpty({ message: 'Product price cannot be empty' })
  @Type(() => Number)
  price: number;

  @IsString()
  @IsOptional()
  totalReviews: string;

  @IsString()
  @IsOptional()
  imgSrc: string;

  @IsString()
  @IsOptional()
  imgSrc2: string;

  @IsNumber(
    { maxDecimalPlaces: 1 },
    { message: 'Rating must be a valid number with maximum 1 decimal place' },
  )
  @Min(0, { message: 'Rating must be at least 0' })
  @Max(5, { message: 'Rating cannot exceed 5' })
  @IsOptional()
  @Type(() => Number)
  ratings: number;

  @IsArray({ message: 'Categories must be an array' })
  @ArrayMinSize(1, { message: 'Product must belong to at least one category' })
  @IsNumber({}, { each: true, message: 'Each category ID must be a number' })
  @Type(() => Number)
  categoryIds: number[];
}

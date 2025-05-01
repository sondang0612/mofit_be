import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  price: number;

  @IsString()
  @IsOptional()
  shortDescription?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsOptional()
  images?: string[];

  @IsString()
  @IsOptional()
  sku?: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  categoryId: number;

  @IsArray()
  @IsOptional()
  attributeIds?: number[];

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  discountId?: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  brandId: number;

  @IsString()
  @IsOptional()
  specifications?: string;

  @IsString()
  @IsOptional()
  origin?: string;
}

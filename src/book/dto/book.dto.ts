import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class BookInput {
  @IsString()
  @MinLength(5)
  @MaxLength(40)
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  image: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  categoryId: number;

  @IsString()
  @MinLength(3)
  @IsOptional()
  @ApiProperty()
  description: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  rating: number;
}

export class PatchBookInput {
  @IsOptional()
  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  image: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  categoryId: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  description: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  rating: number;
}

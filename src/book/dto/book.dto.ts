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

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  categoryId: number;
}

export class PatchBookInput {
  @IsOptional()
  @IsString()
  @ApiProperty()
  title: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  categoryId: number;
}

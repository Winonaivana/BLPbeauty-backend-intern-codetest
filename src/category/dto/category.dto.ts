import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';

export class CategoryInput {
  @IsString()
  @MinLength(1)
  @MaxLength(40)
  @IsNotEmpty()
  @ApiProperty()
  title: string;
}

export class UpdateCategory {
  @IsString()
  @MinLength(1)
  @MaxLength(40)
  @IsOptional()
  @ApiProperty()
  title: string;
}

import { ApiProperty } from '@nestjs/swagger';

export class BookEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  rating: number;

  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  finishDate: Date | null;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  categoryId: number | null;
}

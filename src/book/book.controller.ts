import { Controller, Get, Query } from '@nestjs/common';
import { BookService } from './book.service';
import { CurrentUser } from '../decorators/user.decorator';
import { ApiQuery } from '@nestjs/swagger';
import { User } from '@prisma/client';

@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  findAll(@CurrentUser() currentUser: User, @Query('q') query?: string) {
    return this.bookService.findAll(query, currentUser.id);
  }
}

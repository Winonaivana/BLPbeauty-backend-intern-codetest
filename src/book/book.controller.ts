import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CurrentUser } from '../decorators/user.decorator';
import { ApiQuery } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { BookInput, PatchBookInput } from './dto/book.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  async findAll(@CurrentUser() currentUser: User, @Query('q') query?: string) {
    return await this.bookService.findAll(query, currentUser.id);
  }

  @Post()
  async addBook(@Body() input: BookInput, @CurrentUser() currentUser: User) {
    return await this.bookService.addBook(input, currentUser.id);
  }

  @Delete(':id')
  async deleteBook(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() currentUser: User,
  ) {
    await this.bookService.deleteBook(id, currentUser.id);
    return `Book with id ${id} has been deleted`;
  }

  @Post('finish/:id')
  async finishBook(
    @Param('id', ParseIntPipe) id,
    @CurrentUser() currentUser: User,
  ) {
    return await this.bookService.finishBook(id, currentUser.id);
  }

  @Patch('update/:id')
  async updateBook(
    @Param('id', ParseIntPipe) id,
    @CurrentUser() currentUser: User,
    @Body() input: PatchBookInput,
  ) {
    return this.bookService.updateBook(id, input, currentUser.id);
  }
}

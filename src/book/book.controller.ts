import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  Patch,
  Put,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CurrentUser } from '../decorators/user.decorator';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { BookInput, PatchBookInput } from './dto/book.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { type } from 'os';
import { BookEntity } from './entity/book.entity';

@UseGuards(JwtAuthGuard)
@ApiTags('book')
@ApiBearerAuth()
@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  @ApiOkResponse({ type: BookEntity, isArray: true })
  @ApiQuery({
    name: 'query',
    required: false,
    type: String,
  })
  async findAll(
    @CurrentUser() currentUser: User,
    @Query('query') query?: string,
  ) {
    return await this.bookService.findAll(query, currentUser.id);
  }
  @Get(':id')
  @ApiOkResponse({ type: BookEntity })
  async findById(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() currentUser: User,
  ) {
    return await this.bookService.findById(id, currentUser.id);
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
  @ApiOkResponse({ type: BookEntity })
  async finishBook(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() currentUser: User,
  ) {
    return await this.bookService.finishBook(id, currentUser.id);
  }

  @Put('update/:id')
  @ApiOkResponse({ type: BookEntity })
  async updateBook(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() currentUser: User,
    @Body() input: PatchBookInput,
  ) {
    return this.bookService.updateBook(id, input, currentUser.id);
  }
}

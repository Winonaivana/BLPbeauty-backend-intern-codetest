import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Book } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookInput } from './dto/book.dto';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: string, userId: number): Promise<Book[]> {
    return await this.prisma.book.findMany({
      where: {
        userId: userId,
        title: {
          contains: query,
          mode: 'insensitive',
        },
      },
      orderBy: {
        startDate: 'desc',
      },
    });
  }

  async addBook(input: BookInput, userId: number) {
    try {
      if (input.categoryId) {
        const category = await this.prisma.category.findFirst({
          where: {
            id: input.categoryId,
          },
        });
        if (!category) {
          throw new NotFoundException('no category with that id');
        }
        if (category.userId !== userId) {
          throw new UnauthorizedException('you did not make that folder yet');
        }

        return await this.prisma.book.create({
          data: {
            ...input,
            userId,
            categoryId: input.categoryId ? input.categoryId : undefined,
          },
        });
      }
    } catch (error) {
      if (error.code === 'P2003') {
        throw new NotFoundException('not available');
      }
      throw error;
    }
  }

  async deleteBook(id: number, userId: number) {
    const book = await this.prisma.book.findUnique({ where: { id: id } });

    if (!book) {
      throw new NotFoundException('book does not exist');
    }
    return await this.prisma.book.delete({
      where: { id: id },
    });
  }
}

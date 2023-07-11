import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Book } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookInput, PatchBookInput } from './dto/book.dto';

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
          throw new NotFoundException('Couldnt find category with that id');
        }
        if (category.userId !== userId) {
          throw new UnauthorizedException(`You're not the owner of the folder`);
        }
      }
      return this.prisma.book.create({
        data: {
          ...input,
          userId,
          categoryId: input.categoryId ? input.categoryId : undefined,
        },
      });
    } catch (error) {
      if (error.code === 'P2003') {
        throw new NotFoundException(
          `userId or categoryId is not valid. Try again.`,
        );
      }
      throw error;
    }
  }

  async deleteBook(id: number, userId: number) {
    try {
      const book = await this.prisma.book.findUnique({ where: { id: id } });

      if (!book) {
        throw new NotFoundException('book does not exist');
      }
      if (book.userId !== userId) {
        throw new NotFoundException('this is not your book');
      }
      return await this.prisma.book.delete({
        where: { id: id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(error.meta.cause);
      }
      throw error;
    }
  }
  async finishBook(id: number, userId: number) {
    const book = this.prisma.book.findUnique({ where: { id: id } });
    try {
      if ((await book).userId !== userId) {
        throw new NotFoundException('This book does not belong to you');
      }

      const currentDate = new Date();
      if ((await book).finishDate !== null) {
        throw new BadRequestException('You have finished reading the book');
      }

      const startDate = (await book).startDate;

      const totalDate = currentDate.getDate() - startDate.getDate();

      await this.prisma.book.update({
        data: { finishDate: currentDate },
        where: { id: id },
      });
      if (totalDate > 1) {
        return `You finished your book in ${totalDate} days`;
      }
      {
        return `You finished your book in ${totalDate} day`;
      }
    } catch (error) {
      if (error.code === 'P2003') {
        throw new NotFoundException('not available');
      }
      throw error;
    }
  }

  async updateBook(id: number, input: PatchBookInput, userId: number) {
    try {
      if (input.categoryId) {
        const category = await this.prisma.category.findFirst({
          where: {
            id: input.categoryId,
          },
        });
        if (!category) {
          throw new NotFoundException('Couldnt find category with that id');
        }
        if (category.userId !== userId) {
          throw new UnauthorizedException(`You're not the owner of the folder`);
        }
      }
      return await this.prisma.book.update({
        where: { id: id },
        data: { ...input },
      });
    } catch (error) {
      if (error.code === 'P2003') {
        throw new NotFoundException('not available');
      }
      throw error;
    }
  }
}

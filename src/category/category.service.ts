import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Category } from '@prisma/client';
import { error } from 'console';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async findAllCategory(userId: number): Promise<Category[]> {
    const Category = await this.prisma.category.findMany({
      where: { userId: userId },
    });
    if (!Category) {
      throw new UnauthorizedException('This book does not belong to you');
    }
    return Category;
  }

  async findCategoryById(userId: number, id: number) {
    try {
      const category = await this.prisma.category.findUnique({
        where: { id: id },
      });

      if (category.userId !== userId) {
        throw new UnauthorizedException('You do not own this category');
      }
      if (!category) {
        throw new NotFoundException('Category not found');
      }

      return category;
    } catch (error) {
      throw error;
    }
  }
}

import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Category } from '@prisma/client';
import { error } from 'console';
import { PrismaService } from 'src/prisma/prisma.service';
import { InputCategory, UpdateCategory } from './dto/category.dto';

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

      if (!category) {
        throw new NotFoundException('Category not found');
      }
      if (category.id !== userId) {
        throw new UnauthorizedException('You do not own this category');
      }

      return category;
    } catch (error) {
      throw error;
    }
  }

  async addFolders(input: InputCategory, userId: number): Promise<Category> {
    const { name } = input;

    const category = await this.prisma.category.create({
      data: {
        name,
        userId,
      },
    });
    if (category.userId !== userId) {
      throw new UnauthorizedException('You are not authorized');
    }
    return category;
  }

  async deleteCategory(id: number, userId: number) {
    const category = await this.prisma.category.delete({ where: { id: id } });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    if (category.userId !== userId) {
      throw new UnauthorizedException('You do not own this category');
    }
    return category;
  }

  async updateCategory(id: number, userId: number, input: UpdateCategory) {
    const { name } = input;
    const category = await this.prisma.category.update({
      where: { id: id },
      data: { name },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    if (category.userId !== userId) {
      throw new UnauthorizedException('You do not own this category');
    }

    return category;
  }
}

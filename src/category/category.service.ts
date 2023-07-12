import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Category } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async showCategory(userId: number): Promise<Category[]> {
    const Category = await this.prisma.category.findMany({
      where: { userId: userId },
    });
    if (!Category) {
      throw new UnauthorizedException('This book does not belong to you');
    }
    return Category;
  }
}

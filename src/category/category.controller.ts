import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CurrentUser } from 'src/decorators/user.decorator';
import { User } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}
  @Get()
  async findAllCategories(@CurrentUser() currentUser: User) {
    return await this.categoryService.findAllCategory(currentUser.id);
  }
  @Get(':id')
  async findCategoryById(
    @CurrentUser() currentUser: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.categoryService.findCategoryById(currentUser.id, id);
  }
}

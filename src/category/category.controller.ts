import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CurrentUser } from 'src/decorators/user.decorator';
import { User } from '@prisma/client';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}
  @Get()
  async showCategories(@CurrentUser() currentUser: User) {
    return this.categoryService.showCategory(currentUser.id);
  }
}

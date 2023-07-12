import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CurrentUser } from 'src/decorators/user.decorator';
import { User } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { InputCategory } from './dto/category.dto';

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

  @Post()
  async addCategory(
    @Body() input: InputCategory,
    @CurrentUser() currentUser: User,
  ) {
    return await this.categoryService.addFolders(input, currentUser.id);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CurrentUser } from 'src/decorators/user.decorator';
import { User } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { InputCategory, UpdateCategory } from './dto/category.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@ApiTags('category')
@ApiBearerAuth()
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

  @Delete(':id')
  async deleteCategory(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() currentUser: User,
  ) {
    return await this.categoryService.deleteCategory(id, currentUser.id);
  }

  @Put(':id')
  async updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() currentUser: User,
    @Body() input: UpdateCategory,
  ) {
    return await this.categoryService.updateCategory(id, currentUser.id, input);
  }
}

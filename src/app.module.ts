import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { BookModule } from './book/book.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [AuthModule, PrismaModule, BookModule, CategoryModule],
})
export class AppModule {}

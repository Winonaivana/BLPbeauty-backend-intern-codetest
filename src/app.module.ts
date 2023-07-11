import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { BookModule } from './book/book.module';

@Module({
  imports: [AuthModule, PrismaModule, BookModule],
})
export class AppModule {}

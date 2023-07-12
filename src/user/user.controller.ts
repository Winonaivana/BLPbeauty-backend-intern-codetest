import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { CurrentUser } from 'src/decorators/user.decorator';
import { User } from '@prisma/client';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async findAllUser(@CurrentUser() currentUser: User) {
    return await this.userService.findUser(currentUser.id);
  }
}

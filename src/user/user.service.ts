import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findUser(userId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.id !== userId) {
      throw new UnauthorizedException('Not your account');
    }
    return user;
  }

  async deleteUser(id: number, userId: number) {
    const user = await this.prisma.user.delete({ where: { id: id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.id !== userId) {
      throw new UnauthorizedException('Not your account');
    }

    return `${user.email} have been deleted`;
  }
}

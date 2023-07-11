import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly bcryptRound: number;
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {
    this.bcryptRound = parseInt(process.env['BCRYPT_SALT_ROUND']) || 10;
  }

  async registerUser(input: AuthDto) {
    const hashPassword = await bcrypt.hashSync(
      input.password,
      this.bcryptRound,
    );

    try {
      return await this.prisma.user.create({
        data: {
          email: input.email,
          hashPassword: hashPassword,
        },
        select: {
          id: true,
          email: true,
        },
      });
    } catch (err) {
      if (err.code === 'P2002') {
        throw new ForbiddenException('Email has been used');
      }
      throw err;
    }
  }
}

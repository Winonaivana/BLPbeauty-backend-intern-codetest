import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, AuthLoginDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly prisma: PrismaService,
  ) {}

  @Post('/signup')
  async register(@Body() input: AuthDto) {
    await this.authService.registerUser(input);
    return 'Successfully registered';
  }

  @Post('/signin')
  async login(@Body() input: AuthLoginDto) {
    return await this.authService.loginUser(input);
  }
}

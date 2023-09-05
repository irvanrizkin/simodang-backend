import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login-google')
  async loginGoogle(@Body() createAuthDto: CreateAuthDto): Promise<User> {
    return this.authService.loginGoogle(createAuthDto);
  }
}

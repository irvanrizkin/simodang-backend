import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { User } from '@prisma/client';
import { TokenGuard } from 'src/guard/token.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login-google')
  async loginGoogle(@Body() createAuthDto: CreateAuthDto): Promise<User> {
    return this.authService.loginGoogle(createAuthDto);
  }

  @UseGuards(TokenGuard)
  @Post('logout')
  async logout(@Request() req): Promise<{ message: string }> {
    const { id } = req.user;
    await this.authService.logout(id);
    return { message: 'user logged out' };
  }
}

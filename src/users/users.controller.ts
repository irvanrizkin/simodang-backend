import {
  Controller,
  Body,
  Patch,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { TokenGuard } from 'src/guard/token.guard';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch()
  @UseGuards(TokenGuard)
  update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    const { id } = req.user;
    return this.usersService.update(+id, updateUserDto);
  }

  @Get('/profile')
  @UseGuards(TokenGuard)
  GetProfile(@Request() req): Promise<User> {
    return req.user;
  }
}

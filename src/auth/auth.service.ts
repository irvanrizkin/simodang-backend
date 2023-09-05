import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { randomBytes } from 'crypto';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  private async isUserExist(email: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    return !!user;
  }

  async loginGoogle(createAuthDto: CreateAuthDto): Promise<User> {
    const { email, name, photo } = createAuthDto;
    const isExist = await this.isUserExist(email);

    if (isExist) {
      const token = randomBytes(30).toString('hex');
      return await this.prisma.user.update({
        where: { email },
        data: { token },
      });
    }

    const token = randomBytes(30).toString('hex');
    return await this.prisma.user.create({
      data: {
        email,
        name,
        photo,
        token,
      },
    });
  }
}

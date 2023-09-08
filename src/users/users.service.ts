import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const { name, phoneNum, address } = updateUserDto;
    return await this.prisma.user.update({
      where: { id },
      data: {
        name,
        phoneNum,
        address,
      },
    });
  }
}

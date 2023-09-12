import { Injectable } from '@nestjs/common';
import { CreateMasterDto } from './dto/create-master.dto';
import { Master } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MastersService {
  constructor(private prisma: PrismaService) {}

  create(createMasterDto: CreateMasterDto): Promise<Master> {
    const { id, name, simNum, userId } = createMasterDto;
    return this.prisma.master.create({
      data: {
        id,
        name,
        simNum,
        userId,
      },
    });
  }

  findAll(): Promise<Master[]> {
    return this.prisma.master.findMany();
  }
}

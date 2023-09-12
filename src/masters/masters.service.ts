import { Injectable } from '@nestjs/common';
import { CreateMasterDto } from './dto/create-master.dto';
import { Master } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateMasterDto } from './dto/update-master.dto';

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

  update(id: string, updateMasterDto: UpdateMasterDto): Promise<Master> {
    const { name, simNum, userId } = updateMasterDto;
    return this.prisma.master.update({
      where: { id },
      data: {
        name,
        simNum,
        userId,
      },
    });
  }
}

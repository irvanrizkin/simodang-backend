import { Injectable } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Device } from '@prisma/client';

@Injectable()
export class DevicesService {
  constructor(private prisma: PrismaService) {}

  async create(createDeviceDto: CreateDeviceDto): Promise<Device> {
    const { id, name, masterId } = createDeviceDto;
    return await this.prisma.device.create({
      data: {
        id,
        name,
        masterId,
      },
    });
  }

  async findAll(): Promise<Device[]> {
    return await this.prisma.device.findMany();
  }
}

import { Injectable } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Device } from '@prisma/client';
import { UpdateDeviceDto } from './dto/update-device.dto';

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

  async update(id: string, updateDeviceDto: UpdateDeviceDto): Promise<Device> {
    const {
      name,
      notification,
      tempHigh,
      tempLow,
      phHigh,
      phLow,
      tdoHigh,
      tdoLow,
      tdsHigh,
      tdsLow,
      turbiditiesHigh,
      turbiditiesLow,
      masterId,
    } = updateDeviceDto;

    return await this.prisma.device.update({
      where: { id },
      data: {
        name,
        notification,
        tempHigh,
        tempLow,
        phHigh,
        phLow,
        tdoHigh,
        tdoLow,
        tdsHigh,
        tdsLow,
        turbiditiesHigh,
        turbiditiesLow,
        masterId,
      },
    });
  }
}

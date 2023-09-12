import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Device } from '@prisma/client';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { Threshold } from './dto/threshold';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class DevicesService {
  constructor(private prisma: PrismaService) {}

  async create(createDeviceDto: CreateDeviceDto): Promise<Device> {
    const { id, name, masterId, userId } = createDeviceDto;
    return await this.prisma.device.create({
      data: {
        id,
        name,
        masterId,
        userId,
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
      userId,
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
        userId,
      },
    });
  }

  isInRange(value: number, high: Decimal, low: Decimal): boolean {
    return value < high.toNumber() && value > low.toNumber();
  }

  async isInThreshold(id: string, threshold: Threshold): Promise<boolean> {
    const { temperature, ph, tdo, tds, turbidity } = threshold;

    const device = await this.prisma.device.findUnique({
      where: { id },
    });
    if (!device) throw new NotFoundException('device not found');

    const {
      tempLow,
      tempHigh,
      phLow,
      phHigh,
      tdoLow,
      tdoHigh,
      tdsLow,
      tdsHigh,
      turbiditiesLow,
      turbiditiesHigh,
    } = device;

    const isTempOutRange = this.isInRange(temperature, tempHigh, tempLow);
    const isPhOutRange = this.isInRange(ph, phHigh, phLow);
    const isTdsOutRange = this.isInRange(tds, tdsHigh, tdsLow);
    const isTdoOutRange = this.isInRange(tdo, tdoHigh, tdoLow);
    const isTurbidityOutRange = this.isInRange(
      turbidity,
      turbiditiesHigh,
      turbiditiesLow,
    );

    return (
      isTempOutRange &&
      isPhOutRange &&
      isTdoOutRange &&
      isTdsOutRange &&
      isTurbidityOutRange
    );
  }
}

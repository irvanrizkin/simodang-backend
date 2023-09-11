import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePondDto } from './dto/create-pond.dto';
import { Pond } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { extname } from 'path';
import { StorageService } from 'src/storage/storage.service';
import { Threshold } from '../devices/dto/threshold';
import { DevicesService } from 'src/devices/devices.service';
import { NotificationsService } from 'src/notifications/notifications.service';

@Injectable()
export class PondsService {
  constructor(
    private prisma: PrismaService,
    private readonly storageService: StorageService,
    private devicesService: DevicesService,
    private notificationsService: NotificationsService,
  ) {}

  async create(
    createPondDto: CreatePondDto,
    userId: number,
    file: Express.Multer.File,
  ): Promise<Pond> {
    const { name, address, city, deviceId } = createPondDto;

    if (!file) {
      return await this.prisma.pond.create({
        data: {
          name,
          address,
          city,
          userId,
          deviceId,
        },
      });
    }

    const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(
      file.originalname,
    )}`;
    const imageUrl = this.storageService.getPublicUrl(`ponds/${filename}`);

    const pond = await this.prisma.pond.create({
      data: {
        name,
        address,
        city,
        userId,
        deviceId,
        imageUrl,
      },
    });

    await this.storageService.save(
      `ponds/${filename}`,
      file.mimetype,
      file.buffer,
      [{ filename: file.originalname }, { pondId: pond.id.toString() }],
    );
    return pond;
  }

  async findAll(): Promise<Pond[]> {
    return await this.prisma.pond.findMany();
  }

  async findOne(id: number): Promise<Pond> {
    return await this.prisma.pond.findUnique({
      where: { id },
      include: { device: true },
    });
  }

  async updatePondByThreshold(id: number, threshold: Threshold): Promise<Pond> {
    const { temperature, ph, tdo, tds, turbidity } = threshold;

    const pond = await this.prisma.pond.findUnique({
      where: { id },
      include: { device: true },
    });

    if (!pond) throw new NotFoundException('pond not found');
    const { deviceId, userId } = pond;
    if (!deviceId)
      throw new NotFoundException('device not attached to this pond');

    const isInThreshold = await this.devicesService.isInThreshold(deviceId, {
      temperature,
      ph,
      tdo,
      tds,
      turbidity,
    });

    if (isInThreshold) {
      return await this.prisma.pond.update({
        where: { id },
        data: { status: 1 },
      });
    }

    await this.notificationsService.create(userId, {
      title: 'Kolam anda berada dalam kondisi tidak baik!',
      message: 'Periksa kondisi tambak milik anda',
    });
    return await this.prisma.pond.update({
      where: { id },
      data: { status: 0 },
    });
  }
}

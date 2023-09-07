import { Injectable } from '@nestjs/common';
import { CreatePondDto } from './dto/create-pond.dto';
import { Pond } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { extname } from 'path';
import { StorageService } from 'src/storage/storage.service';

@Injectable()
export class PondsService {
  constructor(
    private prisma: PrismaService,
    private readonly storageService: StorageService,
  ) {}

  async create(
    createPondDto: CreatePondDto,
    userId: number,
    file: Express.Multer.File,
  ): Promise<Pond> {
    const { name, address, city, deviceId } = createPondDto;
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
}

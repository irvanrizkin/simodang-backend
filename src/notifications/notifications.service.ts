import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Notification } from '@prisma/client';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  async create(
    userId: number,
    createNotificationDto: CreateNotificationDto,
  ): Promise<Notification> {
    const { title, message } = createNotificationDto;

    return await this.prisma.notification.create({
      data: {
        title,
        message,
        userId,
      },
    });
  }

  async findAllByToken(userId: number): Promise<Notification[]> {
    return await this.prisma.notification.findMany({
      where: { userId, deleted: 0 },
    });
  }

  async deleteAllByToken(userId: number): Promise<void> {
    await this.prisma.notification.updateMany({
      where: { userId },
      data: { deleted: 1 },
    });
  }
}

import { Controller, Request, Get, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { Notification } from '@prisma/client';
import { TokenGuard } from 'src/guard/token.guard';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  @UseGuards(TokenGuard)
  async findAllByToken(@Request() req): Promise<Notification[]> {
    const { id: userId } = req.user;

    return this.notificationsService.findAllByToken(userId);
  }
}

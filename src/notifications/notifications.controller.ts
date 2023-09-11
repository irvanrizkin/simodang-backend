import { Controller, Request, Get, UseGuards, Delete } from '@nestjs/common';
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

  @Delete()
  @UseGuards(TokenGuard)
  async deleteAllByToken(@Request() req): Promise<{ message: string }> {
    const { id: userId } = req.user;

    await this.notificationsService.deleteAllByToken(userId);

    return {
      message: 'all notification from this user was deleted successfully',
    };
  }
}

import { Module } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { MetricsController } from './metrics.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [MetricsController],
  providers: [MetricsService, PrismaService],
})
export class MetricsModule {}

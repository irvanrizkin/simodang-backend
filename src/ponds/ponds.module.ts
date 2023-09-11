import { Module } from '@nestjs/common';
import { PondsService } from './ponds.service';
import { PondsController } from './ponds.controller';
import { StorageModule } from 'src/storage/storage.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { DevicesModule } from 'src/devices/devices.module';

@Module({
  imports: [StorageModule, DevicesModule],
  controllers: [PondsController],
  providers: [PondsService, PrismaService],
  exports: [PondsService],
})
export class PondsModule {}

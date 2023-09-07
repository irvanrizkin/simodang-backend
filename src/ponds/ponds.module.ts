import { Module } from '@nestjs/common';
import { PondsService } from './ponds.service';
import { PondsController } from './ponds.controller';
import { StorageModule } from 'src/storage/storage.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [StorageModule],
  controllers: [PondsController],
  providers: [PondsService, PrismaService],
})
export class PondsModule {}

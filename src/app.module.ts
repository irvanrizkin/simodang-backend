import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MastersModule } from './masters/masters.module';
import { DevicesModule } from './devices/devices.module';
import { PondsModule } from './ponds/ponds.module';
import { ConfigModule } from '@nestjs/config';
import { MetricsModule } from './metrics/metrics.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    MastersModule,
    DevicesModule,
    PondsModule,
    MetricsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

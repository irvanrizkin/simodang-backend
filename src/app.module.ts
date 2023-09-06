import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MastersModule } from './masters/masters.module';
import { DevicesModule } from './devices/devices.module';

@Module({
  imports: [AuthModule, MastersModule, DevicesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

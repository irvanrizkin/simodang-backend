import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { MastersService } from './masters.service';
import { CreateMasterDto } from './dto/create-master.dto';
import { TokenGuard } from 'src/guard/token.guard';
import { AdminGuard } from 'src/guard/admin.guard';

@Controller('masters')
export class MastersController {
  constructor(private readonly mastersService: MastersService) {}

  @Post()
  @UseGuards(TokenGuard, AdminGuard)
  create(@Body() createMasterDto: CreateMasterDto) {
    return this.mastersService.create(createMasterDto);
  }

  @Get()
  findAll() {
    return this.mastersService.findAll();
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { PondsService } from './ponds.service';
import { CreatePondDto } from './dto/create-pond.dto';
import { TokenGuard } from 'src/guard/token.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateDevicePondDto } from './dto/update-device-pond.dto';
import { AdminGuard } from 'src/guard/admin.guard';

@Controller('ponds')
export class PondsController {
  constructor(private readonly pondsService: PondsService) {}

  @Post()
  @UseGuards(TokenGuard)
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Request() req,
    @Body() createPondDto: CreatePondDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const { id: userId } = req.user;
    return this.pondsService.create(createPondDto, userId, file);
  }

  @Get()
  findAll() {
    return this.pondsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pondsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(TokenGuard)
  updateDeviceByPond(
    @Param('id') id: string,
    @Body() updateDevicePondDto: UpdateDevicePondDto,
  ) {
    return this.pondsService.updateDeviceByPond(+id, updateDevicePondDto);
  }

  @Delete(':id')
  @UseGuards(TokenGuard, AdminGuard)
  remove(@Param('id') id: string) {
    return this.pondsService.remove(+id);
  }
}

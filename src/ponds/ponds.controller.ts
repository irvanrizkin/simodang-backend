import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { PondsService } from './ponds.service';
import { CreatePondDto } from './dto/create-pond.dto';
import { TokenGuard } from 'src/guard/token.guard';
import { FileInterceptor } from '@nestjs/platform-express';

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
}

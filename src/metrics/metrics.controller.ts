import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { CreateMetricDto } from './dto/create-metric.dto';
import { MetricsQueryDto } from './dto/metrics.query.dto';

@Controller('metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Post()
  create(@Body() createMetricDto: CreateMetricDto) {
    return this.metricsService.create(createMetricDto);
  }

  @Get('/aggregated/:id')
  findMetricsByRangeDate(
    @Param('id') id: string,
    @Query() metricsQueryDto: MetricsQueryDto,
  ) {
    return this.metricsService.findMetricsByRangeDate(+id, metricsQueryDto);
  }
}

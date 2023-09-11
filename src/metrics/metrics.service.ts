import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMetricDto } from './dto/create-metric.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Metric } from '@prisma/client';
import { MetricsQueryDto } from './dto/metrics.query.dto';
import { PondsService } from 'src/ponds/ponds.service';

@Injectable()
export class MetricsService {
  constructor(
    private prisma: PrismaService,
    private pondsService: PondsService,
  ) {}

  async create(createMetricDto: CreateMetricDto): Promise<Metric> {
    const {
      pool_id: pondId,
      temper_val: temperature,
      ph_val: ph,
      oxygen_val: tdo,
      tds_val: tds,
      turbidities_val: turbidity,
    } = createMetricDto;

    const pond = await this.pondsService.findOne(pondId);
    if (!pond) throw new NotFoundException('pond not found');

    const { deviceId } = pond;
    if (!deviceId)
      throw new NotFoundException('device not attached to this pond');

    await this.pondsService.updatePondByThreshold(pondId, {
      temperature,
      ph,
      tdo,
      tds,
      turbidity,
    });

    return await this.prisma.metric.create({
      data: {
        pondId,
        temperature,
        ph,
        tdo,
        tds,
        turbidity,
        deviceId,
      },
    });
  }

  async findMetricsByRangeDate(
    pondId: number,
    findMetricsDto: MetricsQueryDto,
  ): Promise<Metric[]> {
    const { startDate, endDate, take, skip } = findMetricsDto;
    return await this.prisma.$queryRaw`
    SELECT
      DATE(createdAt) AS createdAt,
      AVG(temperature) AS temperature,
      AVG(ph) AS ph,
      AVG(tdo) AS tdo,
      AVG(tds) AS tds,
      AVG(turbidity) AS turbidity
    FROM
      Metric
    WHERE
      pondId = ${pondId} AND
      createdAt BETWEEN ${startDate} AND ${endDate + ' 23:59:59'}
    GROUP BY
      DATE(createdAt)
    ORDER BY DATE(createdAt)
    LIMIT ${take} OFFSET ${skip};
    `;
  }

  async findLastMetric(pondId: number) {
    return await this.prisma.metric.findFirst({
      where: {
        pondId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}

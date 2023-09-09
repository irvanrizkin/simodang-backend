import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Article } from '@prisma/client';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    const { title, url, image } = createArticleDto;
    return await this.prisma.article.create({
      data: {
        title,
        url,
        image,
      },
    });
  }

  async findAll(): Promise<Article[]> {
    return await this.prisma.article.findMany();
  }

  async findOne(id: number): Promise<Article> {
    return await this.prisma.article.findUnique({
      where: { id },
    });
  }

  async update(
    id: number,
    updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    const { title, url, image, published } = updateArticleDto;
    return await this.prisma.article.update({
      where: { id },
      data: {
        title,
        url,
        image,
        published,
      },
    });
  }
}

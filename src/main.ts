import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaErrorHandlerFilter } from './filter/prisma-error-handler.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaErrorHandlerFilter(httpAdapter));

  await app.listen(5000);
}
bootstrap();

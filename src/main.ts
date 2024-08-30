import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './shared/helpers/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  // app.enableCors({
  //   origin: 'http://localhost:3000',
  //   methods: 'GET,POST,PATCH,PUT,DELETE,OPTIONS',
  //   allowedHeaders: 'Content-Type, Authorization',
  // });
  app.enableCors();

  await app.listen(3200);
}
bootstrap();

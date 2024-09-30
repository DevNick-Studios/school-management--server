import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './shared/helpers/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://school-management-swart.vercel.app',
    ],
    methods: 'GET,POST,PATCH,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
  });

  await app.listen(process.env.PORT || 3200);
}
bootstrap();

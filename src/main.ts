import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global validation with transformation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Transform incoming requests to match the DTO
      whitelist: true, // Strips undefined properties
      forbidNonWhitelisted: true, // Throws an error for extra properties
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

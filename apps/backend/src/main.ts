import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const port = configService.get<number>(
    'PORT',
    3000,
  );
  const corsOrigin = configService.get<string>(
    'CORS_ORIGIN',
    'http://localhost:5173',
  );

  console.log(
    `Server is starting on port: ${port}`,
  );

  // Enable CORS with proper configuration
  app.enableCors({
    origin: corsOrigin,
    methods: [
      'GET',
      'HEAD',
      'PUT',
      'PATCH',
      'POST',
      'DELETE',
    ],
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true, // Enables cookies and headers for cross-origin requests
  });

  // Global validation pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip out unwanted properties
    }),
  );

  // Start the server
  await app.listen(port);
  console.log(
    `Server is running on http://localhost:${port}`,
  );
}
bootstrap();

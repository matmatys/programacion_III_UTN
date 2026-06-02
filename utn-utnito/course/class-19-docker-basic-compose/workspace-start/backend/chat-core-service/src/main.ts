import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './basic/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  // Global filter: centralizes error shape across all controllers.
  app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost)));

  // Global validation: strips unknown fields and validates DTOs automatically.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Swagger config: creates the API documentation metadata.
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Class 17 - Backend Config + Validation + Global Errors')
    .setDescription('Configuration, validation and global error handling over class 16 backend')
    .setVersion('1.0.0')
    // Swagger config: enables Bearer token input inside Swagger UI.
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Paste access token here: Bearer <token>',
      },
      'jwtAuth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  // Swagger route: available at /api.
  SwaggerModule.setup('api', app, document);

  await app.listen(5001);
}

bootstrap();

import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  // Swagger config: creates the API documentation metadata.
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Class 14 - Auth JWT (start)')
    .setDescription('Start state before adding JWT auth flow')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  // Swagger route: available at /api.
  SwaggerModule.setup('api', app, document);

  await app.listen(5001);
}

bootstrap();

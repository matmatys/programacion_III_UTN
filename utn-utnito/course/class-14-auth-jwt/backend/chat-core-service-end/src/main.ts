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
    .setTitle('Class 14 - Auth JWT')
    .setDescription('JWT auth flow: login, refresh-token, me, and Bearer-protected endpoints')
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

import 'reflect-metadata';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { AppModule } from './app.module';
import { SelectiveLogger } from './common/logging/selective.logger';

const GLOBAL_PREFIX = 'api/v1/games-store';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    logger: new SelectiveLogger(),
  });
  const config = app.get(ConfigService);

  app.setGlobalPrefix(GLOBAL_PREFIX);

  app.enableCors({
    origin: config.get<string[]>('cors.allowedOrigins', []),
    credentials: true,
  });

  const openApiConfig = new DocumentBuilder()
    .setTitle('Games Store API')
    .setDescription(
      'API REST de la aplicación Games Store, construida con NestJS y MongoDB.',
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description:
          'Token JWT obtenido mediante el endpoint de inicio de sesión',
      },
      'access-token',
    )
    .addTag('auth', 'Autenticación y registro de usuarios')
    .addTag('games', 'Gestión de juegos')
    .build();

  const document = SwaggerModule.createDocument(app, openApiConfig, {
    operationIdFactory: (_controllerKey, methodKey) => methodKey,
  } as Parameters<typeof SwaggerModule.createDocument>[2]);

  app.use(
    '/docs',
    apiReference({
      content: document,
      theme: 'purple',
      metaData: {
        title: 'Games Store API',
      },
    }),
  );

  const port = config.get<number>('port', 4000);
  await app.listen(port);

  Logger.log(
    `Servidor iniciado correctamente: http://localhost:${port}/${GLOBAL_PREFIX}`,
    'Bootstrap',
  );
  Logger.log(
    `Documentación API disponible en: http://localhost:${port}/docs`,
    'Bootstrap',
  );
}

void bootstrap();

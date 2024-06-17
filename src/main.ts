import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const configService = app.get(ConfigService);
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder().setTitle('Bluegrid API example').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = configService.getOrThrow<number>('HTTP_PORT');
  await app.listen(port, '0.0.0.0', async () => {
    Logger.log(
      `🚀 Application is running! Check out the docs on: ${await app.getUrl()}/docs`,
    );
  });
}
bootstrap();

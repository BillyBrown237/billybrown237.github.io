import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './common/interceptors/Logging.interceptor';
import { ConsoleLogger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      prefix: 'Billy Potfolio',
    }),
  });

  // Access ConfigService
  const configService = app.get(ConfigService);
  const port = configService.get<number>('APP_PORT') ?? 3000;

  const config = new DocumentBuilder()
    .setTitle('Potfolio')
    .setDescription('Api Documentation for my portfolio')
    .setVersion('1.0')
    .addTag('portfolio')
    .addBearerAuth()
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(port);
}

void bootstrap();

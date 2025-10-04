import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './common/interceptors/Logging.interceptor';
import {
  BadRequestException,
  ConsoleLogger,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      prefix: 'Billy Potfolio',
    }),
  });

  app.enableCors({
    origin: ['http://localhost:5173', 'https://your-portfolio.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true, // if using cookies or auth headers
  });

  app.setGlobalPrefix('api');

  // Access ConfigService
  const configService = app.get(ConfigService);
  const port = configService.get<number>('APP_PORT') ?? 3000;

  const isProd = configService.get<string>('NODE_ENV') === 'production';

  if (!isProd) {
    const config = new DocumentBuilder()
      .setTitle('Potfolio')
      .setDescription('Api Documentation for my portfolio')
      .setVersion('1.0')
      .addTag('portfolio')
      .addCookieAuth('Authentication', {
        type: 'apiKey',
        in: 'cookie',
      })
      .build();

    const document = SwaggerModule.createDocument(app, config);
    app.use(
      '/reference',
      apiReference({
        content: document,
      }),
    );
  }

  app.useGlobalInterceptors(new LoggingInterceptor());
  app.use(cookieParser());
  app.use(helmet());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        return new BadRequestException(
          errors.map((err) => ({
            property: err.property,
            constraints: err.constraints,
          })),
        );
      },
    }),
  );
  await app.listen(port);
}

void bootstrap();

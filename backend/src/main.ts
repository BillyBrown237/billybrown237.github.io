import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './common/interceptors/Logging.interceptor';
import { ConsoleLogger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      prefix: 'Billy Potfolio',
    }),
  });

  // Access ConfigService
  const configService = app.get(ConfigService);
  const port = configService.get<number>('APP_PORT') ?? 3000;

  app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen(port);
}
void bootstrap();

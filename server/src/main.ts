import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { globalPrefix } from './constants';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
  });

  app.setGlobalPrefix(globalPrefix);

  await app.listen(process.env.PORT || 5000);
}

bootstrap();

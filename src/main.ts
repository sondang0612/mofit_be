import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import * as express from 'express';

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // set security http headers
  app.use(helmet());

  app.enableCors({
    origin: ['http://localhost:8080', 'http://localhost:4000'],
    credentials: true,
    exposedHeaders: ['Content-Disposition'],
  });

  // limit request api
  // 1000 request for the same ip each 1 hours
  const limiter = rateLimit({
    max: 1000,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour',
  });
  app.use('/api', limiter);

  app.use(express.json({ limit: '10kb' }));

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(PORT, () => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    Logger.log(
      `🏃‍♂️ App running on port: ${PORT}. ⏳ Current local timezone: ${timezone}`,
    );
  });
}
bootstrap();

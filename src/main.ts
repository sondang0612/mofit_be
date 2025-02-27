import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:8080'],
    credentials: true,
    exposedHeaders: ['Content-Disposition'],
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    Logger.log(
      `🏃‍♂️ App running on port: ${PORT}. ⏳ Current local timezone: ${timezone}`,
    );
  });
}
bootstrap();

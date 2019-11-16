import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import sseMiddleware from 'express-sse-middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(sseMiddleware);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();

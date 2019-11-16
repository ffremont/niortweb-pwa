import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SseController } from './sse/sse.controller';
import { SseService } from './sse/sse.service';
import { SseMiddleware } from './sse.middleware';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    })
  ],
  controllers: [AppController, SseController],
  providers: [AppService, SseService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply( SseMiddleware )
      .forRoutes( SseController );
  }
}

import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { SseService } from './sse/sse.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly sseService: SseService) { }

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/messages')
  async addMessage(@Body() msg: string) {
    this.sseService.fire(msg);

    return 'yes !';
  }

}

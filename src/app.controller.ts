import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { SseService } from './sse/sse.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly sseService: SseService) { }

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/messages')
  async addMessage(@Body() body: any){
    console.log(body);
    this.sseService.fire(body.message);

    return 'yes !';
  }

}

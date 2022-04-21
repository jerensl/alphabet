import { Body, Controller, Get, Post, Res } from '@nestjs/common';

import { AppService } from './app.service';
import { Messaging } from './domain/Message';

@Controller('message')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  message(@Body() message: Messaging) {
    return this.appService.pushNewMessage(message);
  }

  @Get()
  getMessage() {
    return this.appService.getAllMessage();
  }
}

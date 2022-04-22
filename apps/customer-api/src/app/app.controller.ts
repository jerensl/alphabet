import { Body, Controller, Get, Post } from '@nestjs/common';

import { AppService } from './app.service';
import { MessageDTO } from './domain/Message';

@Controller('message')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  message(@Body() message: MessageDTO) {
    return this.appService.pushNewMessage(message.message);
  }

  @Get()
  getMessage() {
    return this.appService.getAllMessage();
  }
}

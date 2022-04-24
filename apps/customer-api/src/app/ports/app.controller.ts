import { Body, Controller, Get, Post } from '@nestjs/common';

import { AppService } from '../adapters/app.service';
import { MessageDTO } from '../domain/Message';

@Controller('message')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async message(@Body() message: MessageDTO) {
    const dataEncoded = await this.appService.encoded(message.message);
    const dataPrediction = await this.appService.prediction(dataEncoded);
    const category = this.appService.getCategory(dataPrediction.predictions);
    this.appService.addData(
      message.message,
      category,
      dataPrediction.predictions
    );
  }

  @Get()
  getMessage() {
    return this.appService.getAllMessage();
  }
}

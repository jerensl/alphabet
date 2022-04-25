import { Body, Controller, Get, Post } from '@nestjs/common';

import { MessageService } from './message.service';
import { MessageDTO } from './message.entity';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  async message(@Body() message: MessageDTO) {
    const dataEncoded = await this.messageService.encoded(message.message);
    const dataPrediction = await this.messageService.prediction(dataEncoded);
    const category = this.messageService.getCategory(
      dataPrediction.predictions
    );
    this.messageService.addData(
      message.message,
      category,
      dataPrediction.predictions
    );
  }

  @Get()
  getMessage() {
    return this.messageService.getAllMessage();
  }
}

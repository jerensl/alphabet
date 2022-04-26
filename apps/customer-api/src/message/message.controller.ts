import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { MessageService } from './message.service';
import { MessageDTO } from './message.entity';
import { Message as MessageModel } from '@prisma/client';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  async message(@Body() message: MessageDTO): Promise<MessageModel> {
    const dataEncoded = await this.messageService.encoded(message.message);
    const dataPrediction = await this.messageService.prediction(dataEncoded);
    const category = this.messageService.getCategory(
      dataPrediction.predictions[0]
    );
    return this.messageService.addMessage({
      data: {
        user_id: message.user_id,
        message: message.message,
        category: category,
        normal: dataPrediction.predictions[0][0],
        hate_speech: dataPrediction.predictions[0][1],
        abusive: dataPrediction.predictions[0][2],
      },
    });
  }

  @Get('user/:id')
  async getMessageByID(@Param('id') user_id: string): Promise<MessageModel[]> {
    return this.messageService.getMessageByID({
      where: {
        user_id: user_id,
      },
    });
  }

  @Get()
  getMessage(): Promise<MessageModel[]> {
    return this.messageService.getAllMessage();
  }
}

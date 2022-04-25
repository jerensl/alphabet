import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 10000,
    }),
    MessageModule,
  ],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}

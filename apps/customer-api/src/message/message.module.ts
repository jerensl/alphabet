import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { PrismaModule } from '../database/prisma.module';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 10000,
        maxRedirects: 5,
      }),
    }),
    MessageModule,
    PrismaModule,
  ],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}

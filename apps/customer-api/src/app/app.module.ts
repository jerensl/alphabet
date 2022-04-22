import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { AppController } from './ports/app.controller';
import { AppService } from './adapters/app.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 10000,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

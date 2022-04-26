import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { BertWordPieceTokenizer } from 'tokenizers';
import { MessageEncoding, Predictions } from './message.entity';
import { promisify } from 'util';
import { lastValueFrom, map } from 'rxjs';
import { PrismaService } from '../database/prisma.service';
import { Message, Prisma } from '@prisma/client';

@Injectable()
export class MessageService {
  constructor(
    private httpService: HttpService,
    private prisma: PrismaService
  ) {}

  async getAllMessage(): Promise<Message[] | null> {
    return this.prisma.message.findMany({});
  }

  async getMessageByID(params: {
    where: Prisma.MessageWhereInput;
  }): Promise<Message[] | null> {
    const { where } = params;
    return this.prisma.message.findMany({
      where,
    });
  }

  async encoded(message: string): Promise<MessageEncoding> {
    const tokenizer = await BertWordPieceTokenizer.fromOptions({
      vocabFile: './vocabulary.txt',
    });

    const encode = promisify(tokenizer.encode.bind(tokenizer));

    const token = await encode(message);

    const input_ids = token.getIds();
    const attention_mask = token.getAttentionMask();

    while (input_ids.length < 256) {
      attention_mask.push(0);
      input_ids.push(0);
    }

    const data = {
      instances: [
        {
          input_ids: input_ids,
          attention_mask: attention_mask,
        },
      ],
    };

    return data;
  }

  async prediction(dataEncoded: MessageEncoding): Promise<Predictions> {
    const responseData = await lastValueFrom(
      this.httpService
        .post(process.env.SENTIMENT_MODEL_URL, JSON.stringify(dataEncoded))
        .pipe(
          map((response) => {
            return response.data;
          })
        )
    );

    return responseData;
  }

  getCategory(prediction: Array<number>): string {
    const max = Math.max(...prediction);

    const index = prediction.indexOf(max);

    if (index === 1) {
      return 'hate speech';
    } else if (index === 2) {
      return 'abusive';
    }

    return 'normal';
  }

  async addMessage(params: {
    data: Prisma.MessageCreateInput;
  }): Promise<Message> {
    const { data } = params;
    return this.prisma.message.create({
      data,
    });
  }
}

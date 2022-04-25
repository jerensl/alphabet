import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { BertWordPieceTokenizer } from 'tokenizers';
import { Messaging, MessageEncoding, Predictions } from './message.entity';
import { promisify } from 'util';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class MessageService {
  private readonly messaging: Messaging[] = [];
  constructor(private httpService: HttpService) {}
  private readonly logger = new Logger();

  getAllMessage(): Messaging[] {
    return this.messaging;
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

  addData(message: string, category: string, prediction: Array<number>) {
    this.messaging.push({
      message: message,
      prediction: prediction,
      category: category,
    });
  }
}

import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { BertWordPieceTokenizer } from 'tokenizers';
import { Messaging } from '../domain/Message';
import { promisify } from 'util';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class AppService {
  private readonly messaging: Messaging[] = [];
  constructor(private httpService: HttpService) {}
  private readonly logger = new Logger();

  getAllMessage(): Messaging[] {
    return this.messaging;
  }

  async pushNewMessage(message: string) {
    const tokenizer = await BertWordPieceTokenizer.fromOptions({
      vocabFile: './vocabulary.txt',
    });

    const encode = promisify(tokenizer.encode.bind(tokenizer));

    const token = await encode(message);

    const attention_mask = token.getAttentionMask();
    const input_ids = token.getIds();

    const data = {
      instances: [
        {
          input_ids: input_ids,
          attention_mask: attention_mask,
        },
      ],
    };

    while (attention_mask.length < 256) {
      attention_mask.push(0);
      input_ids.push(0);
    }

    const responseData = await lastValueFrom(
      this.httpService
        .post(`http://${process.env.SENTIMENT_MODEL_URL}`, JSON.stringify(data))
        .pipe(
          map((response) => {
            return response.data;
          })
        )
    );

    let category = '';

    const max = Math.max(...responseData.predictions);

    const index = await responseData.predictions.indexOf(max);

    if (index == 1) {
      category = 'hate speech';
    } else if (index === 2) {
      category = 'abusive';
    } else {
      category = 'normal';
    }

    this.messaging.push({
      message: message,
      prediction: responseData.predictions,
      category: category,
    });
  }
}

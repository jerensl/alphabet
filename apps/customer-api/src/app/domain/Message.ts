import { IsNotEmpty } from 'class-validator';

export interface Messaging {
  message: string;
  prediction: Array<number>;
  category: string;
}

interface MessageData {
  input_ids: Array<number>;
  attention_mask: Array<number>;
}

export interface MessageEncoding {
  instances: Array<MessageData>;
}

export interface Predictions {
  predictions: Array<number>;
}

export class MessageDTO {
  @IsNotEmpty()
  message: string;
}

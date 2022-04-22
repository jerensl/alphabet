import { IsNotEmpty } from 'class-validator';

export interface Messaging {
  message: string;
  prediction: Array<number>;
  category: string;
}

export class MessageDTO {
  @IsNotEmpty()
  message: string;
}

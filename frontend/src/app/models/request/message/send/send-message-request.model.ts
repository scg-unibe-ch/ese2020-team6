import { MessageModel } from 'src/app/models/message/message.model';

export interface SendMessageRequestModel extends Pick<MessageModel, 'body'>{
  productId: number
}

export class SendMessageRequest implements SendMessageRequestModel {
  constructor(
    public body: string,
    public productId: number
  ) {}
}

import { MessageModel } from 'src/app/models/message/message.model'
import { Is } from '../../compare/is'

export interface MessageResponseModel extends Omit<MessageModel, 'createdAt'> {
  messageThreadId: number;
  createdAt: string;
}

export class MessageResponse implements MessageResponseModel {

  constructor(
    public messageId: number,
    public messageThreadId: number,
    public senderId: number,
    public body: string,
    public createdAt: string,
    public readStatus: boolean
  ) {}

  public static isMessageResponseModel(message: MessageResponseModel): message is MessageResponseModel {
    return Is.is(message, ['messageId', 'messageThreadId', 'senderId',
      'body', 'createdAt', 'readStatus'])
  }
}

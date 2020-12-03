import { MessageModel } from 'src/app/models/message/message.model'

export interface MessageResponseModel extends Omit<MessageModel, 'createdAt'> {
  createdAt: string;
}

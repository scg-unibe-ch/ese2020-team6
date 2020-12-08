import { MessageModel } from 'src/app/models/message/message.model'
import { Is } from '../../compare/is'
import { CutUserModel, CutUser } from '../../user/cut-user.model'

export interface MessageResponseModel extends Omit<MessageModel, 'createdAt' | 'sender'> {
  messageThreadId: number;
  createdAt: string;
  sender: CutUserModel;
}

export class MessageResponse implements MessageResponseModel {

  constructor(
    public messageId: number,
    public messageThreadId: number,
    public senderId: number,
    public sender: CutUserModel,
    public body: string,
    public createdAt: string,
    public readStatus: boolean
  ) {}

  public static isMessageResponseModel(message: MessageResponseModel): message is MessageResponseModel {
    let meessageCopy: any = Object.assign({}, message);
    delete meessageCopy.sender;
    return Is.is(meessageCopy, [
      'messageId', 'messageThreadId', 'senderId',
      'body', 'createdAt', 'readStatus'
    ]) && CutUser.isCutUserModel(message.sender);
  }
}

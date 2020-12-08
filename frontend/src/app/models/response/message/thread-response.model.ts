import { MessageResponseModel, MessageResponse } from './message-response.model';
import { ParticpantResponseModel } from './participant-response.model';
import { ThreadModel } from '../../message/thread.model';
import { Is } from '../../compare/is'
import { ProductModel } from '../../product/product.model';

export interface ThreadResponseModel extends Omit<ThreadModel, 'messages' | 'participants' | 'product'> {
  product: ProductModel;
  productId: number
  participants: [ParticpantResponseModel, ParticpantResponseModel];
  messages: Array<MessageResponseModel>;
}

export class ThreadResponse implements ThreadResponseModel {

  constructor(
    public messageThreadId: number,
    public productId: number,
    public product: ProductModel,
    public participants: [ParticpantResponseModel, ParticpantResponseModel],
    public isAccepted: boolean,
    public messages: Array<MessageResponseModel>
  ) {}

  public static isThreadResponseModel(thread: ThreadResponseModel): thread is ThreadResponseModel {
    if (Array.isArray(thread.messages)) {

      let messagesCheck = thread.messages.map(
        (message: MessageResponseModel) => {
          return MessageResponse.isMessageResponseModel(message)
        }
      )

      Is.is(thread, ['messageThreadId', 'product', 'productId', 'participants', 'isAccepted'])
      && !(messagesCheck.includes(false));
    } else return false;
  }
}

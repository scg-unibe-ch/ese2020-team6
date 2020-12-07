import { MessageResponseModel } from './message-response.model';
import { ThreadModel } from '../../message/thread.model';
import { Is } from '../../compare/is'
import { UserModel } from '../../user/user.model';
import { ProductModel } from '../../product/product.model';

export interface ThreadResponseModel extends Omit<ThreadModel, 'messages' | 'participants' | 'product'> {
  product: ProductModel;
  productId: number
  participants: [UserModel, UserModel];
  messages: Array<MessageResponseModel>;
}

export class ThreadResponse implements ThreadResponseModel {

  constructor(
    public messageThreadId: number,
    public productId: number,
    public product: ProductModel,
    public participants: [UserModel, UserModel],
    public isAccepted: boolean,
    public messages: Array<MessageResponseModel>
  ) {}

  public static isThreadResponseModel(thread: ThreadResponseModel): thread is ThreadResponseModel {
    return Is.is(thread, ['messageThreadId', 'product', 'productId', 'participants', 'isAccepted', 'messages'])
  }
}

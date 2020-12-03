import { MessageResponseModel } from './message-response.model';
import { ThreadModel } from '../../message/thread.model';

export interface ThreadResponseModel extends Omit<ThreadModel, 'messages'> {
  messages: Array<MessageResponseModel>
}

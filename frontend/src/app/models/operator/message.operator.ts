import { OperatorFunction} from 'rxjs';
import { transformator } from './transformator.model';
import { MessageResponseModel, MessageResponse } from '../response/response-model.module';
import { Message } from '../message/message.model';

export function transformMessage<T>(): OperatorFunction<any, any> {
  return transformator<MessageResponseModel, T>(Message.buildFromMessageResponseModel, MessageResponse.isMessageResponseModel);
}

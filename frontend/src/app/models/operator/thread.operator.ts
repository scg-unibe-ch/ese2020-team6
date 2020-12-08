import { OperatorFunction} from 'rxjs';
import { transformator } from './transformator';
import { ThreadResponseModel, ThreadResponse, SimpleThreadResponseModel, SimpleThreadResponse } from '../response/response.module';
import { Thread, SimpleThread } from '../message/thread.model';

export function transfromThread<T>(): OperatorFunction<any, any> {
  return transformator<ThreadResponseModel, T>(Thread.buildFromThreadResponseModel, ThreadResponse.isThreadResponseModel);
}

export function transfromSimpleThread<T>(): OperatorFunction<any, any> {
  return transformator<SimpleThreadResponseModel, T>(SimpleThread.buildFromSimpleThreadResponseModel, SimpleThreadResponse.isSimpleThreadResponseModel);
}

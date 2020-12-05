import { OperatorFunction} from 'rxjs';
import { transformator } from './transformator';
import { ThreadResponseModel, ThreadResponse } from '../response/response-model.module';
import { Thread } from '../message/thread.model';

export function transfromThread<T>(): OperatorFunction<any, any> {
  return transformator<ThreadResponseModel, T>(Thread.buildFromThreadResponseModel, ThreadResponse.isThreadResponseModel);
}

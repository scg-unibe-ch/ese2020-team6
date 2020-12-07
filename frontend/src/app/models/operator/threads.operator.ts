import { OperatorFunction} from 'rxjs';
import { transformator } from './transformator';
import { ThreadsResponseModel, ThreadsResponse } from '../response/response-model.module';
import { Threads } from '../message/threads.model';

export function transfromThreads<T>(): OperatorFunction<any, any> {
  return transformator<ThreadsResponseModel, T>(Threads.buildFromThreadsResponseModel, ThreadsResponse.isThreadsResponseModel);
}

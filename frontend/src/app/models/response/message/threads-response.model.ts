import { ThreadResponseModel } from '../response-model.module';

export interface ThreadsResponseModel extends Array<ThreadResponseModel>{};

export class ThreadsResponse extends Array<ThreadResponseModel>  implements ThreadsResponseModel {
  public static isThreadsResponseModel(threads: ThreadsResponseModel): threads is ThreadsResponseModel {
    return Array.isArray(threads);
  }
}

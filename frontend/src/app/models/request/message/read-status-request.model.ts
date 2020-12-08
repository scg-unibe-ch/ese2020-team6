import { ThreadModel } from 'src/app/models/message/thread.model';

export interface ReadStatusRequestModel extends Pick<ThreadModel, 'messageThreadId'>{}

export class ReadStatusRequest implements ReadStatusRequestModel {
  constructor(
    public messageThreadId: number
  ) {}
}

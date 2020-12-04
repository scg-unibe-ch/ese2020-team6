import { ThreadResponseModel } from 'src/app/models/response/response-model.module';
import { User } from '../user/user.model';
import { Thread } from './thread.model';

export interface ThreadsModel {
  threads: Array<Thread>;
}

export class Threads implements ThreadsModel {
  public threads: Array<Thread>;

  constructor(
    threads: Array<Thread>
  ) {
    this.threads = threads.sort(Thread.compare);
  }

  get latestThreadDate(): Date {
    return this.latestThread.latestMessageDate;
  }

  get latestThread(): Thread {
    return this.threads[0]
  }

  public getByParticipants(participantOne: User, participantTwo: User): Thread {
    return this.threads.find((thread: Thread) => {
      let [seller, buyer]: [User, User] = thread.participants;
      return (seller.equals(participantOne) || seller.equals(participantTwo))
          && (buyer.equals(participantOne) || buyer.equals(participantTwo))
          && !participantOne.equals(participantTwo);
    })
  }

  public static buildFromThreadResponseModelArray(threads: Array<ThreadResponseModel>): Threads {
    return new Threads(threads.map((thread: ThreadResponseModel) => Thread.buildFromThreadResponseModel(thread)));
  }
}

import { ThreadResponseModel } from 'src/app/models/response/response-model.module';
import { User } from '../user/user.model';
import { Thread, NullThread } from './thread.model';


export interface ThreadsModel {
  threads: Array<Thread>;
}

export class Threads implements ThreadsModel, IterableIterator<Thread>{
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

  get length(): number {
    return this.threads.length;
  }

  public next(): IteratorResult<Thread> {
    return this.threads[Symbol.iterator]().next();
  }

  [Symbol.iterator](): IterableIterator<Thread> {
    return this.threads[Symbol.iterator]();;
  }

  public getByIndex(index: number): Thread {
    return this.threads[index];
  }

  public getByParticipants(participantOne: User, participantTwo: User): Thread {
    return this.threads.find((thread: Thread) => {
      let [seller, buyer]: [User, User] = thread.participants;
      return (User.equals(seller, participantOne) || User.equals(seller, participantTwo))
          && (User.equals(buyer, participantOne) || User.equals(buyer, participantTwo))
          && !User.equals(participantOne, participantTwo);
    })
  }

  public static buildFromThreadResponseModelArray(threads: Array<ThreadResponseModel>): Threads {
    return new Threads(threads.map((thread: ThreadResponseModel) => Thread.buildFromThreadResponseModel(thread)));
  }
}


export class NullThreads extends Threads {
  private static _instance: NullThreads;

  constructor() {
    super(new Array<NullThread>());
  }

  public static instance(): NullThreads {
    if (!NullThreads._instance) NullThreads._instance = new NullThreads();
    return NullThreads._instance;
  }

}

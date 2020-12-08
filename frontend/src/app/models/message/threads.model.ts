import { ThreadResponseModel, ThreadsResponseModel } from 'src/app/models/response/response-model.module';
import { CutUser } from '../user/cut-user.model';
import { Thread, NullThread } from './thread.model';
import { Product } from '../product/product.model';


export interface ThreadsModel {
  threads: Array<Thread>;
}

export class Threads implements ThreadsModel, IterableIterator<Thread>{

  constructor(
    public threads: Array<Thread>
  ) {
    this.threads = threads;
    this.sortThreads();
  }

  private sortThreads(): void {
    this.threads.sort(Thread.compare);
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

  public getByProduct(product: Product): Thread {
    let foundThread = this.threads.find((thread: Thread) => thread.product.productId === product.productId);
    return foundThread ? foundThread : NullThread.instance();
  }

  public getByIndex(index: number): Thread {
    return this.threads[index];
  }

  private getThreadIds(): Array<number> {
    return this.threads.map((thread: Thread) => thread.messageThreadId);
  }

  private getThreadById(messageThreadId: number): Thread {
    let threadIndex = this.getThreadIds().indexOf(messageThreadId);
    return this.getByIndex(threadIndex);
  }

  public getByParticipants(participantOne: CutUser, participantTwo: CutUser): Thread {
    let foundThread = this.threads.find((thread: Thread) => {
      let [seller, buyer]: [CutUser, CutUser] = thread.participants;
      return (CutUser.equals(seller, participantOne) || CutUser.equals(seller, participantTwo))
          && (CutUser.equals(buyer, participantOne) || CutUser.equals(buyer, participantTwo))
          && !CutUser.equals(participantOne, participantTwo);
    })
    return foundThread ? foundThread : NullThread.instance();
  }


  public mergeAndRetreive(threads: Threads): Threads {
    if (this instanceof NullThreads) {
      return threads;
    } else {
      this.merge(threads);
      return this;
    }
  }


  public merge(threads: Threads): void {
    let oldThreadIds = this.getThreadIds();
    threads.threads.forEach((thread: Thread) => {
      if (oldThreadIds.includes(thread.messageThreadId)) {
        this.getThreadById(thread.messageThreadId).merge(thread);
      } else this.threads.push(thread);
    })
    this.sortThreads();
  }

  public static buildFromThreadsResponseModel(threads: ThreadsResponseModel): Threads {
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

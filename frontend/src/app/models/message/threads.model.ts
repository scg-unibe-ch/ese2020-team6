import { ThreadResponseModel, ThreadsResponseModel } from 'src/app/models/response/response.module';
import { Thread, NullThread } from './thread.model';
import { Product } from '../product/product.model';
import { CutUser, NullCutUser } from '../user/cut-user.model';


export interface ThreadsModel {
  threads: Array<Thread>;
}

export class Threads implements ThreadsModel, IterableIterator<Thread>{

  private _currentSender: CutUser = NullCutUser.instance();

  constructor(
    public threads: Array<Thread>
  ) {
    this.threads = threads;
    this.sortThreads();
  }

  private sortThreads(): void {
    this.threads.sort(Thread.compare);
  }

  public getByProduct(product: Product): Thread {
    let foundThread = this.threads.find((thread: Thread) => thread.product.productId === product.productId);
    return foundThread ? foundThread : NullThread.instance();
  }

  public getByIndex(index: number): Thread {
    return this.threads[index];
  }

  private getById(messageThreadId: number): Thread {
    let threadIndex = this.ids().indexOf(messageThreadId);
    return this.getByIndex(threadIndex);
  }

  private ids(): Array<number> {
    return this.threads.map((thread: Thread) => thread.messageThreadId);
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
    let oldThreadIds = this.ids();
    threads.threads.forEach((thread: Thread) => {
      if (oldThreadIds.includes(thread.messageThreadId)) {
        this.getById(thread.messageThreadId).merge(thread);
      } else this.threads.push(thread);
    })
    this.sortThreads();
  }

  public next(): IteratorResult<Thread> {
    return this.threads[Symbol.iterator]().next();
  }
  [Symbol.iterator](): IterableIterator<Thread> {
    return this.threads[Symbol.iterator]();
  }
  public map(callback: (currentValue: Thread, index?: number, array?: Array<Thread>) => any, thisArg?: any): Array<any> {
    if (thisArg) return this.threads.map(callback, thisArg);
    else return this.threads.map(callback);
  }

  public static buildFromThreadsResponseModel(threads: ThreadsResponseModel): Threads {
    if (!(threads instanceof Threads)) return new Threads(threads.map((thread: ThreadResponseModel) => Thread.buildFromThreadResponseModel(thread)));
    else return threads;
  }
  set currentSender(sender: CutUser) {
    this._currentSender = sender;
    this.threads.forEach((thread: Thread) => thread.currentSender = sender);
  }
  get currentSender(): CutUser { return this._currentSender; }
  get latestThreadDate(): Date { return this.latestThread.latestMessageDate; }
  get latestThread(): Thread { return this.threads[0]; }
  get length(): number { return this.threads.length; }
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

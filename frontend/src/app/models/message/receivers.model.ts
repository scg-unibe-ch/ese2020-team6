import { Participant } from './participant.model';
import { Thread } from './thread.model';
import { CutUser } from '../user/cut-user.model';

export interface ReceiversModel {
  receivers: Array<Participant>;
}

export class Receivers implements ReceiversModel, IterableIterator<CutUser> {

  public receivers: Array<Participant> = new Array<Participant>();

  constructor(
    thread: Thread
  ) {
    this.receivers = thread.participants.omit(thread.currentSender)
  }

  public toString: () => string = () => {
    let usernames: string = '';
    this.receivers.forEach((receiver: Participant, index: number) => {
      usernames += receiver.user.userName;
      if (index + 1 < this.length) usernames += ', ';
    })
    return usernames;
  }

  public users(): Array<CutUser> {
    return this.receivers.map((receiver: Participant) => receiver.user);
  }

  public next(): IteratorResult<CutUser> {
    return this.users()[Symbol.iterator]().next();
  }

  [Symbol.iterator](): IterableIterator<CutUser> {
    return this.users()[Symbol.iterator]();
  }

  public map(callback: (currentValue: CutUser, index?: number, array?: Array<CutUser>) => any, thisArg?: any): Array<any> {
    if (thisArg) return this.users().map(callback, thisArg);
    else return this.users().map(callback);
  }

  get length(): number { return this.receivers.length; }
}

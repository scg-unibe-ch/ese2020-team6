import { ThreadResponseModel, MessageResponseModel } from 'src/app/models/response/response-model.module';
import { Message } from './message.model';
import { User, UserModel } from '../user/user.model';
import { Product } from '../product/product.model';

export interface ThreadModel {
  messageThreadId: number;
  product: Product;
  participants: [User, User]; // seller, buyer
  isAccepted: boolean;
  messages: Array<Message>;
}


export class Thread implements ThreadModel {
  public messages: Array<Message>;
  private currentSenderId: number;

  constructor(
    public messageThreadId: number,
    public product: Product,
    public participants: [User, User],
    public isAccepted: boolean,
    messages: Array<Message>
  ) {
    this.messages = messages.sort(Message.compare);
  }

  get latestMessageDate(): Date {
    if (this.length > 0) return this.latestMessage.createdAt;
  }

  get latestMessage(): Message {
    return this.messages[0]
  }

  get length(): number {
    return this.messages.length;
  }

  public hasParticipant(participant: User): boolean {
    return this.participants.map((existingParticipant: User) => User.equals(existingParticipant, participant))
    .includes(true);
  }

  public setCurrentSender(sender: number | User): void {
    this.currentSenderId = sender instanceof User ? (sender as User).userId : (sender as number);
  }

  public addMessage(body: string): void;
  public addMessage(body: string, sender: number | User): void;
  public addMessage(body: string, sender?: number | User): void {
    if (sender) {
      this.setCurrentSender(sender);
    } else if (!this.currentSenderId) throw new Error('No Sender set or passed!')
    this.messages.push(Message.buildFromBodyAndUser(body, this.currentSenderId));
  }

  public static compare: (threadOne: Thread, threadTwo: Thread) => number = (threadOne: Thread, threadTwo: Thread) => {
    return threadOne.compare(threadTwo);
  }

  /*
    Compares two threads by calculating the difference of the latest message time.
    If this is newer than the thread, then the value of return will be smaller
    than 0. If they are equal, the difference will be 0 and if this is older
    than the thread, then the value of return will ve greater than 0.

    returns < 0: this newer than thread,
    returns 0: this equals thread,
    returns > 0: this older than thread
  */
  public compare(thread: Thread): number {
    if (this.length > 0 && thread.length > 0) return this.latestMessageDate.getTime() - thread.latestMessageDate.getTime();
    else if (this.length > 0 && thread.length === 0) return -1;
    else if (this.length === 0 && thread.length > 0) return 1;
    else return 0;
  }

  /*
    Returns a boolean value representing if this is newer than the thread.
  */
  public isNewerThan(thread: Thread): boolean {
    return this.compare(thread) < 0;
  }

  /*
    Returns a boolean value representing if this is older than the thread.
  */
  public isOlderThan(thread: Thread): boolean {
    return this.compare(thread) > 0;
  }

  /*
    Returns a boolean value representing if this is equal to thread.
  */
  public isEqualTo(thread: Thread): boolean {
    return this.compare(thread) === 0;
  }

  public static buildFromThreadResponseModel(thread: ThreadResponseModel): Thread {
    return new Thread(
      thread.messageThreadId,
      Product.buildFromProductModel(thread.product),
      this.buildParticipants(thread.participants),
      thread.isAccepted,
      this.buildMessagesArray(thread.messages)
    )
  }

  private static buildParticipants(participants: Array<UserModel>): [User, User] {
    if (participants.length !== 2) throw new Error('Thread has either less or more than two users!');
    return [User.buildFromUserModel(participants[0]), User.buildFromUserModel(participants[1])];
  }

  private static buildMessagesArray(messages: Array<MessageResponseModel>): Array<Message> {
    return messages.map((message: MessageResponseModel) => Message.buildFromMessageResponseModel(message));
  }
}

export class NullThread extends Thread {
  private static _instance: NullThread;

  constructor() {
    super(null, Product.NullProduct, [User.NullUser, User.NullUser], null, new Array<Message>());
  }

  public static instance(): NullThread {
    if (!NullThread._instance) NullThread._instance = new NullThread();
    return NullThread._instance;
  }

}

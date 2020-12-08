import { ThreadResponseModel, MessageResponseModel } from 'src/app/models/response/response-model.module';
import { Message } from './message.model';
import { CutUser, NullCutUser } from '../user/cut-user.model';
import { Product, NullProduct } from '../product/product.model';
import { Participants, NullParticipants } from './participants.model';
import { Participant, NullParticipant } from './participant.model';
import { Receivers } from './receivers.model'

export interface ThreadModel {
  messageThreadId?: number;
  product: Product;
  participants: Participants; // seller, buyer
  isAccepted: boolean;
  messages: Array<Message>;
}


export class Thread implements ThreadModel {
  public messages: Array<Message>;
  private _currentSender: CutUser = NullCutUser.instance();

  constructor(
    public product: Product,
    public participants: Participants,
    public isAccepted: boolean,
    messages: Array<Message>,
    public messageThreadId?: number
  ) {
    this.messages = messages;
    this.sortMessages();
  }

  private sortMessages(): void { this.messages.sort(Message.compare); }

  public hasParticipant(participant: CutUser): boolean {
    return this.participants.find(participant) instanceof NullParticipant;
  }

  public getByUserId(userId: number): Participant { return this.participants.find(userId); }

  private addMessage(message: Message, sort?: boolean): void {
    this.messages.push(message);
    if (sort !== false) this.sortMessages();
  }

  private addMessages(messages: Array<Message>): void {
    messages.forEach((message: Message) => this.addMessage(message, false));
    this.sortMessages();
  }

  public newMessage(body: string): Message {
    if (this.currentSender instanceof NullCutUser) throw new Error('No Sender set or passed!')
    let message: Message = Message.buildFromBodyAndCutUser(body, this.currentSender);
    message.setThread(this);
    return message;
  }

  private ids(): Array<number> {
    return this.messages.map((message: Message) => message.messageId);
  }

  public merge(thread: Thread): void {
    if (this.messageThreadId && this.hasMessages && this.messageThreadId === thread.messageThreadId) {
      let latestOldMessageId = this.latestMessage.messageId;
      let newMessageIds = thread.ids();
      if (latestOldMessageId) {
        let indexOfLatestOldMessageIdInNewTread = newMessageIds.indexOf(latestOldMessageId);
        let newMessages = thread.messages.slice(indexOfLatestOldMessageIdInNewTread + 1);
        this.addMessages(newMessages);
        this.isAccepted = thread.isAccepted;
      }
    } else this.setThread(thread);
  }

  private setThread(thread: Thread): void {
    this.messageThreadId = thread.messageThreadId;
    this.product = thread.product;
    this.participants = thread.participants;
    this.isAccepted = thread.isAccepted;
    this.messages = thread.messages;
    this.sortMessages();
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
    if (this.length > 0 && thread.length > 0) return thread.latestMessageDate.getTime() - this.latestMessageDate.getTime();
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

  public static compare: (threadOne: Thread, threadTwo: Thread) => number = (threadOne: Thread, threadTwo: Thread) => {
    return threadOne.compare(threadTwo);
  }

  public static buildFromThreadResponseModel(thread: ThreadResponseModel): Thread {
    if (!(thread instanceof Thread)) {
      return new Thread(
        Product.buildFromProductModel(thread.product),
        Participants.buildFromParticipantsResponseModel(thread.participants),
        thread.isAccepted,
        Thread.buildMessagesArray(thread.messages),
        thread.messageThreadId
      )
    } else return thread;
  }

  private static buildMessagesArray(messages: Array<MessageResponseModel>): Array<Message> {
    return messages.map((message: MessageResponseModel) => Message.buildFromMessageResponseModel(message));
  }

  set currentSender(sender: CutUser) {
    this._currentSender = sender;
    this.messages.forEach((message: Message) => message.currentSender = sender);
  }
  get currentSender(): CutUser { return this._currentSender; }
  get latestMessageDate(): Date { if (this.length > 0) return this.latestMessage.createdAt; }
  get latestMessage(): Message { return this.messages[this.length-1] }
  get length(): number { return this.messages.length; }
  get receivers(): Receivers { return new Receivers(this); }
  get hasId(): boolean { return this.messageThreadId ? true : false; }
  get hasMessages(): boolean { return this.length > 0; }
  get canSendMessage(): boolean {
    if (this.currentSender.userId === this.product.sellerId) return true;
    else if (this.messages.length === 0 && this.isAccepted === false) return true;
    else return this.isAccepted;
  }
}

export class NullThread extends Thread {
  private static _instance: NullThread;

  constructor() {
    super(NullProduct.instance(), NullParticipants.instance(), null, new Array<Message>());
  }

  public static instance(): NullThread {
    if (!NullThread._instance) NullThread._instance = new NullThread();
    return NullThread._instance;
  }

}

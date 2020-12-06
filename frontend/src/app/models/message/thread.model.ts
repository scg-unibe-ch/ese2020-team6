import { ThreadResponseModel, MessageResponseModel } from 'src/app/models/response/response-model.module';
import { Message } from './message.model';
import { CutUser, CutUserModel, NullCutUser } from '../user/cut-user.model';
import { Product, NullProduct } from '../product/product.model';

export interface ThreadModel {
  messageThreadId?: number;
  product: Product;
  participants: [CutUser, CutUser]; // seller, buyer
  isAccepted: boolean;
  messages: Array<Message>;
}


export class Thread implements ThreadModel {
  public messages: Array<Message>;
  private currentSenderId: number;

  constructor(
    public product: Product,
    public participants: [CutUser, CutUser],
    public isAccepted: boolean,
    messages: Array<Message>,
    public messageThreadId?: number
  ) {
    this.messages = messages;
    this.sortMessages();
  }

  get hasMessages(): boolean {
    return this.length > 0;
  }

  get canSendMessage(): boolean {
    if (this.currentSenderId === this.product.sellerId) return true;
    else if (this.messages.length === 0 && this.isAccepted === false) return true;
    else return this.isAccepted;
  }

  private sortMessages(): void {
    this.messages.sort(Message.compare);
  }

  get latestMessageDate(): Date {
    if (this.length > 0) return this.latestMessage.createdAt;
  }

  get latestMessage(): Message {
    return this.messages[this.length-1]
  }

  get length(): number {
    return this.messages.length;
  }

  public hasParticipant(participant: CutUser): boolean {
    return this.participants.map((existingParticipant: CutUser) => CutUser.equals(existingParticipant, participant))
    .includes(true);
  }

  public receiver(senderOrSenderId: CutUser | number): CutUser {
    if (!senderOrSenderId) return NullCutUser.instance();
    let senderId: number = typeof senderOrSenderId === 'number' ? senderOrSenderId : (senderOrSenderId as CutUser).userId;
    let [seller, buyer] = this.participants;
    if (seller.userId === senderId) return buyer;
    else if (buyer.userId === senderId) return seller;
    else return NullCutUser.instance();
  }

  public setCurrentSender(sender: number | CutUser): void {
    this.currentSenderId = sender instanceof CutUser ? (sender as CutUser).userId : (sender as number);
  }

  private addMessage(message: Message, sort?: boolean): void {
    this.messages.push(message);
    if (sort !== false) this.sortMessages();
  }

  private addMessages(messages: Array<Message>): void {
    messages.forEach((message: Message) => this.addMessage(message, false));
    this.sortMessages();
  }

  public newMessage(body: string): Message;
  public newMessage(body: string, sender: number | CutUser): Message;
  public newMessage(body: string, sender?: number | CutUser): Message {
    if (sender) {
      this.setCurrentSender(sender);
    } else if (!this.currentSenderId) throw new Error('No Sender set or passed!')
    let message: Message = Message.buildFromBodyAndCutUser(body, this.currentSenderId);
    message.setThread(this);
    return message;
  }

  public static compare: (threadOne: Thread, threadTwo: Thread) => number = (threadOne: Thread, threadTwo: Thread) => {
    return threadOne.compare(threadTwo);
  }

  private getMessagesIds(): Array<number> {
    return this.messages.map((message: Message) => message.messageId);
  }


  public merge(thread: Thread): void {
    if (this.messageThreadId && this.hasMessages) {
      let latestOldMessageId = this.latestMessage.messageId;
      let newMessageIds = thread.getMessagesIds();
      if (latestOldMessageId) {
        let indexOfLatestOldMessageIdInNewTread = newMessageIds.indexOf(latestOldMessageId);
        let newMessages = thread.messages.slice(indexOfLatestOldMessageIdInNewTread + 1);
        this.addMessages(newMessages);
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
      Product.buildFromProductModel(thread.product),
      Thread.buildParticipants(thread.participants),
      thread.isAccepted,
      Thread.buildMessagesArray(thread.messages),
      thread.messageThreadId
    )
  }

  private static buildParticipants(participants: Array<CutUserModel>): [CutUser, CutUser] {
    if (participants.length !== 2) throw new Error('Thread has either less or more than two users!');
    return [CutUser.buildFromCutUserModel(participants[0]), CutUser.buildFromCutUserModel(participants[1])];
  }

  private static buildMessagesArray(messages: Array<MessageResponseModel>): Array<Message> {
    return messages.map((message: MessageResponseModel) => Message.buildFromMessageResponseModel(message));
  }
}

export class NullThread extends Thread {
  private static _instance: NullThread;

  constructor() {
    super(NullProduct.instance(), [NullCutUser.instance(), NullCutUser.instance()], null, new Array<Message>());
  }

  public static instance(): NullThread {
    if (!NullThread._instance) NullThread._instance = new NullThread();
    return NullThread._instance;
  }

}

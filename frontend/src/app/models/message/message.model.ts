import { MessageResponseModel } from 'src/app/models/response/response-model.module';
import { CutUser } from '../user/cut-user.model';
import { Thread } from './thread.model';
import { RequestBuilder } from 'src/app/models/request/request-builder.interface';
import { SendMessageRequest } from 'src/app/models/request/message/send/send-message-request.model';

export interface MessageModel {
  messageId?: number;
  senderId: number;
  body: string;
  createdAt: Date;
  readStatus: boolean;
}

export class Message implements MessageModel, RequestBuilder<SendMessageRequest> {

  private static messageDateFormatOptions: Intl.DateTimeFormatOptions = {
    localeMatcher: 'lookup',
    day: 'numeric', month: 'short',
    hour: '2-digit', minute: '2-digit'
  }
  private static messageDateFormat = new Intl.DateTimeFormat('de-CH', Message.messageDateFormatOptions);

  private _thread: Thread;

  constructor(
    public senderId: number,
    public body: string,
    public createdAt: Date,
    public readStatus: boolean,
    public messageId?: number
  ) {}

  public setThread(thread: Thread): void {
    this._thread = thread;
  }

  public request(): SendMessageRequest {
    return new SendMessageRequest(this.body, this._thread.product.productId);
  }

  get fromatCreatedAt(): string {
    return Message.messageDateFormat.format(this.createdAt).split(',').join('');
  }

  public static buildFromMessageResponseModel(message: MessageResponseModel): Message {
    return new Message(
      message.senderId,
      message.body,
      new Date(message.createdAt),
      message.readStatus,
      message.messageId
    )
  }

  public static buildFromBodyAndCutUser(body: string, sender: number | CutUser): Message {
    let senderId: number = sender instanceof CutUser ? (sender as CutUser).userId : (sender as number);
    return new Message(senderId, body, new Date(), false);
  }

  public static compare: (msgOne: Message, msgTwo: Message) => number = (messageOne: Message, messageTwo: Message) => {
    return messageOne.compare(messageTwo);
  }

  /*
    Compares two messages by calculating the difference of the creation time.
    If this is newer than the message, then the value of return will be smaller
    than 0. If they are equal, the difference will be 0 and if this is older
    than the message, then the value of return will ve greater than 0.

    returns < 0: this newer than message,
    returns 0: this equals message,
    returns > 0: this older than message
  */
  public compare(message: Message): number {
    return this.createdAt.getTime() - message.createdAt.getTime();
  }

  /*
    Returns a boolean value representing if this is newer than the message.
  */
  public isNewerThan(message: Message): boolean {
    return this.compare(message) < 0;
  }

  /*
    Returns a boolean value representing if this is older than the message.
  */
  public isOlderThan(message: Message): boolean {
    return this.compare(message) > 0;
  }

  /*
    Returns a boolean value representing if this is equal to message.
  */
  public isEqualTo(message: Message): boolean {
    return this.compare(message) === 0;
  }

}


export class NullThread extends Message {
  private static _instance: NullThread;

  constructor() {
    super(null, null, new Date(), null);
  }

  public static instance(): NullThread {
    if (!NullThread._instance) NullThread._instance = new NullThread();
    return NullThread._instance;
  }

}

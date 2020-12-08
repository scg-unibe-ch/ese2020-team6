import { MessageResponseModel } from 'src/app/models/response/response-model.module';
import { CutUser, NullCutUser } from '../user/cut-user.model';
import { Thread } from './thread.model';
import { RequestBuilder } from 'src/app/models/request/request-builder.interface';
import { SendMessageRequest } from 'src/app/models/request/message/send/send-message-request.model';

export interface MessageModel {
  messageId?: number;
  senderId: number;
  body: string;
  createdAt: Date;
  readStatus: boolean;
  sender: CutUser;
}

export class Message implements MessageModel, RequestBuilder<SendMessageRequest> {

  private _currentSender: CutUser = NullCutUser.instance();

  private static messageDateFormatOptions: Intl.DateTimeFormatOptions = {
    localeMatcher: 'lookup',
    day: 'numeric', month: 'short',
    hour: '2-digit', minute: '2-digit'
  }
  private static messageDateFormat = new Intl.DateTimeFormat('de-CH', Message.messageDateFormatOptions);

  private _thread: Thread;

  constructor(
    public senderId: number,
    public sender: CutUser,
    public body: string,
    public createdAt: Date,
    public readStatus: boolean,
    public messageId?: number
  ) {}

  public setThread(thread: Thread): void {
    this._thread = thread;
  }

  /*
    Builds a request from a Message. The request is accepted by the backend on
    the endpointURL '/message/send'.
  */
  public request(): SendMessageRequest {
    if (!this._thread) throw new Error('No Thread set!');
    if (this._thread.hasId) {
      return new SendMessageRequest(
        this.body,
        this._thread.product.productId,
        this._thread.messageThreadId
      );
    } else return new SendMessageRequest(this.body, this._thread.product.productId);
  }

  /*
    Formats the createdAt date to:
    dd. mmm. hh:mm
    whrere mmm is the abbreviation of the month in tree letters.
  */
  get fromatCreatedAt(): string {
    return Message.messageDateFormat.format(this.createdAt).split(',').join('');
  }

  /*
    Builds a Message from a message response model.

    Can be used in transformation of a Http response.
  */
  public static buildFromMessageResponseModel(message: MessageResponseModel): Message {
    return new Message(
      message.senderId,
      CutUser.buildFromCutUserModel(message.sender),
      message.body,
      new Date(message.createdAt),
      message.readStatus,
      message.messageId
    )
  }

  /*
    Builds a Message from a body and a sender.
  */
  public static buildFromBodyAndCutUser(body: string, sender: CutUser): Message {
    return new Message(sender.userId, sender, body, new Date(), false);
  }

  /*
    Compares two messages with a static method.

    Cang be used to sort arrays. See method below.
  */
  public static compare(msgOne: Message, msgTwo: Message): number {
    return msgOne.compare(msgTwo);
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

  set currentSender(sender: CutUser) { this._currentSender = sender; }
  get currentSender(): CutUser { return this._currentSender; }
  get isSender(): boolean {
    if (!(this.sender instanceof NullCutUser) && !(this.currentSender instanceof NullCutUser)) {
      return this.sender.userId === this.currentSender.userId;
    } else return false;
  }

}


export class NullMessage extends Message {
  private static _instance: NullMessage;

  constructor() {
    super(null, NullCutUser.instance(), null, new Date(), null);
  }

  public static instance(): NullMessage {
    if (!NullMessage._instance) NullMessage._instance = new NullMessage();
    return NullMessage._instance;
  }

}

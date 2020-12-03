import { MessageResponseModel } from 'src/app/models/response/response-model.module';

export interface MessageModel {
  messageId: number;
  messageThreadId: number;
  senderId: number;
  body: string;
  createdAt: Date;
  readStatus: boolean;
}

export class Message implements MessageModel {

  private static messageDateFormatOptions: Intl.DateTimeFormatOptions = {
    localeMatcher: 'lookup',
    day: 'numeric', month: 'short',
    hour: '2-digit', minute: '2-digit'
  }
  private static messageDateFormat = new Intl.DateTimeFormat('de-CH', Message.messageDateFormatOptions);



  constructor(
    public messageId: number,
    public messageThreadId: number,
    public senderId: number,
    public body: string,
    public createdAt: Date,
    public readStatus: boolean
  ) {}



  get fromatCreatedAt(): string {
    return Message.messageDateFormat.format(this.createdAt).split(',').join('');
  }

  public static buildFromMessageResponseModel(message: MessageResponseModel): Message {
    return new Message(
      message.messageId,
      message.messageThreadId,
      message.senderId,
      message.body,
      new Date(message.createdAt),
      message.readStatus
    )
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

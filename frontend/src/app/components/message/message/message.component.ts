import { Component, Input } from '@angular/core';
import { Message, NullMessage } from 'src/app/models/message/message.model';

@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {

  @Input()
  public message: Message = NullMessage.instance();

  constructor() { }

  public messageClasses(message: Message): Array<string> {
    let classes: Array<string> = ['message'];
    classes.push(message.isSender ? 'sent' : 'response');
    return classes;
  }

  public formatCreatedAt(message: Message): string {
    return message.fromatCreatedAt;
  }

}

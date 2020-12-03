import { NgForm } from '@angular/forms';
import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Thread, NullThread } from 'src/app/models/message/thread.model';
import { Message } from 'src/app/models/message/message.model';
import { UserService } from 'src/app/services/user/user.service';
import { SuccessLoader } from 'src/app/services/service.module';
import { User } from 'src/app/models/user/user.model';

@Component({
  selector: 'app-message-content',
  templateUrl: './message-content.component.html',
  styleUrls: ['./message-content.component.scss']
})
export class MessageContentComponent {
  public messages: any = new Array<Message>();

  private _thread: Thread = NullThread.instance();
  @Input()
  set thread(thread: Thread) {
    if (thread) {
      this.messages = thread.messages;
      this._thread = thread;
    }
  }
  get thread(): Thread {
    return this._thread;
  }
  answer: any;
  public senderId: number;

  constructor(
    private snackBar: MatSnackBar,
    private userService: UserService
  ) {
    this.userService.subscribe(new SuccessLoader((user: User) => this.senderId = user.userId));
  }

  sendMessage(answer: NgForm): void {
    if (this._thread instanceof NullThread) {
      this.openSnackBar();
    } else {
      const messageId = this.thread.messages[this.thread.messages.length - 1].messageId + 1;
      const messageThread = this.thread.messages[0].messageThreadId;
      const senderId = 1;
      const createdAd = new Date();
      const readStatus = false;
      this.answer = new Message(messageId, messageThread, senderId, answer.value, createdAd, readStatus)
      this.thread.messages.push(this.answer);
    }
  }

  public openSnackBar(): void {
    this.snackBar.open('Chose someone you want write to.', '', {
      duration: 2000,
      panelClass: ['snackbar']
    });
  }

  public messageClasses(message: Message): Array<string> {
    let classes: Array<string> = ['message'];
    classes.push(message.senderId === this.senderId ? 'sent' : 'response');
    return classes;
  }

  public formatCreatedAt(message: Message): string {
    return message.fromatCreatedAt;
  }

}

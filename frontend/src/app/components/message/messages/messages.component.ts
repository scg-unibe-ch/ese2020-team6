import { NgModel } from '@angular/forms';
import { Component, Input, ElementRef, ViewChild, OnInit, AfterViewChecked } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Thread, NullThread } from 'src/app/models/message/thread.model';
import { UserService } from 'src/app/services/user/user.service';
import { SuccessLoader } from 'src/app/services/service.module';
import { User } from 'src/app/models/user/user.model';
import { MessageService } from 'src/app/services/message/message.service';
import { CutUser } from 'src/app/models/user/cut-user.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit, AfterViewChecked{

  public endpointUrl = environment.endpointURL;
  public senderId: number;

  private _thread: Thread = NullThread.instance();
  @Input()
  set thread(thread: Thread) {
    if (thread) {
      if (this.senderId) thread.setCurrentSender(this.senderId);
      this._thread = thread;
    }
  }
  get thread(): Thread {
    return this._thread;
  }

  @ViewChild('messagesElement')
  public messagesElement: ElementRef;

  constructor(
    private snackBar: MatSnackBar,
    private userService: UserService,
    public messageService: MessageService
  ) {
    this.userService.subscribe(new SuccessLoader((user: User) => {
      this.senderId = user.userId;
      if (!(this.thread instanceof NullThread)) this.thread.setCurrentSender(user.cutUser());
    }));
  }

  public sendMessage(message: NgModel): void {
    if (this._thread instanceof NullThread) {
      this.openSnackBar();
    } else if (message.valid) {
      let newMessage = this.thread.newMessage(message.value);
      this.messageService.send(newMessage);
    }
  }

  public ngOnInit(): void {
    this.scrollToBottom();
  }

  public ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  public openSnackBar(): void {
    this.snackBar.open('Chose someone you want write to.', '', {
      duration: 2000,
      panelClass: ['snackbar']
    });
  }

  private scrollToBottom(): void {
    try {
      this.messagesElement.nativeElement.scrollTop = this.messagesElement.nativeElement.scrollHeight;
    } catch(err) { }
  }

  get receiver(): CutUser {
    return this.thread.receiver(this.senderId);
  }

}

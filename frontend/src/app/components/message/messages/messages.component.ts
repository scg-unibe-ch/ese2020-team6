import { NgModel } from '@angular/forms';
import { Component, Input, ElementRef, ViewChild, OnInit, AfterViewChecked } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Thread, NullThread } from 'src/app/models/message/thread.model';
import { MessageService } from 'src/app/services/message/message.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit, AfterViewChecked{

  public endpointUrl = environment.endpointURL;

  private _thread: Thread = NullThread.instance();
  @Input()
  set thread(thread: Thread) {
    if (thread) {
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
    public messageService: MessageService
  ) { }

  public sendMessage(message: NgModel): void {
    if (this._thread instanceof NullThread) {
      this.openSnackBar();
    } else if (message.valid) {
      let newMessage = this.thread.newMessage(message.value);
      this.messageService.send(newMessage).subscribe(() => message.reset());
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

}

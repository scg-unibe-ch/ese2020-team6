import { NgModel } from '@angular/forms';
import { Component, Input, ElementRef, ViewChild, OnInit, AfterViewChecked } from '@angular/core';
import { Thread, NullThread } from 'src/app/models/message/thread.model';
import { MessageService } from 'src/app/services/message/message.service';
import { PopupService } from 'src/app/services/popup/popup.service';

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit, AfterViewChecked{

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
    public messageService: MessageService,
    private popupService: PopupService
  ) { }

  public sendMessage(message: NgModel): void {
    if (this._thread instanceof NullThread) {
      this.popupService.openPopup('root', 'Chose a thread first.', 'warn')
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

  private scrollToBottom(): void {
    try {
      this.messagesElement.nativeElement.scrollTop = this.messagesElement.nativeElement.scrollHeight;
    } catch(err) { }
  }

}

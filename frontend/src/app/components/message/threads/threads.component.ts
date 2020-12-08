import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Threads, NullThreads } from 'src/app/models/message/threads.model';
import { Thread, NullThread } from 'src/app/models/message/thread.model';
import { MessageService } from 'src/app/services/message/message.service';

@Component({
  selector: 'threads',
  templateUrl: './threads.component.html',
  styleUrls: ['./threads.component.scss']
})
export class ThreadsComponent {

  private _threads: Threads = NullThreads.instance();
  @Input()
  set threads(threads: Threads) {
    this._threads = threads;
    if (!(this.currentThread instanceof NullThread)) this.setThread(this.currentThread);
  }
  get threads(): Threads {
    return this._threads
  }
  @Input()
  public currentThread: Thread = NullThread.instance();

  @Output() threadEmitter = new EventEmitter<any>();

  constructor(
    private messageService: MessageService
  ) {}

  private setThread(thread: Thread): void {
    this.threadEmitter.emit(thread);
  }

  public showThread(thread: Thread): void {
    if (thread.messageThreadId !== this.currentThread.messageThreadId) {
      this.messageService.setReadStatus(thread);
      this.threadEmitter.emit(thread);
    }
  }

  public threadClasses(thread: Thread): Array<string> {
    let classes = ['thread'];
    classes.push(thread.isAccepted ? 'accepted' : 'not-accepted');
    return classes;
  }
}

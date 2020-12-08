import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Threads, NullThreads } from 'src/app/models/message/threads.model';
import { Thread, NullThread } from 'src/app/models/message/thread.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'threads',
  templateUrl: './threads.component.html',
  styleUrls: ['./threads.component.scss']
})
export class ThreadsComponent {

  public endpointUrl = environment.endpointURL;

  private _threads: Threads = NullThreads.instance();
  @Input()
  set threads(threads: Threads) {
    this._threads = threads;
    if (!(this.currentThread instanceof NullThread)) this.setThread(this.currentThread);
    else this.setFirstThread();
  }
  get threads(): Threads {
    return this._threads
  }
  @Input()
  public currentThread: Thread = NullThread.instance();

  @Output() threadEmitter = new EventEmitter<any>();

  private setFirstThread(): void {
    if (this.threads.length > 0) this.setThread(this.threads.getByIndex(0));
  }

  private setThread(thread: Thread): void {
    this.threadEmitter.emit(thread);
  }

  public showThread(name: string): void {
    this.threadEmitter.emit(name);
  }

  public threadClasses(thread: Thread): Array<string> {
    let classes = ['thread'];
    classes.push(thread.isAccepted ? 'accepted' : 'not-accepted');
    return classes;
  }
}

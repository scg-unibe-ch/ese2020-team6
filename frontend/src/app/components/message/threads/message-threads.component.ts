import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Threads, NullThreads } from 'src/app/models/message/threads.model';

@Component({
  selector: 'app-message-threads',
  templateUrl: './message-threads.component.html',
  styleUrls: ['./message-threads.component.scss']
})
export class MessageThreadsComponent {

  private _threads: Threads = NullThreads.instance();
  @Input()
  set threads(threads: Threads) {
    this._threads = threads;
    this.setFirstThread();
  }
  get threads(): Threads {
    return this._threads
  }
  @Output() threadEmitter = new EventEmitter<any>();
  constructor() { }

  public setFirstThread(): void {
    if (this.threads.length > 0) this.threadEmitter.emit(this.threads.getByIndex(0))
  }

  showMessage(name: string): void {
    this.threadEmitter.emit(name);
  }
}

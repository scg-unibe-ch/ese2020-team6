import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Threads, NullThreads } from 'src/app/models/message/threads.model';
import { Thread } from 'src/app/models/message/thread.model';
import { UserService } from 'src/app/services/user/user.service';
import { SuccessLoader } from 'src/app/services/service.module';
import { User } from 'src/app/models/user/user.model';

@Component({
  selector: 'app-message-threads',
  templateUrl: './message-threads.component.html',
  styleUrls: ['./message-threads.component.scss']
})
export class MessageThreadsComponent {

  private _threads: Threads = NullThreads.instance();
  private senderId: number;
  @Input()
  set threads(threads: Threads) {
    this._threads = threads;
    this.setFirstThread();
  }
  get threads(): Threads {
    return this._threads
  }
  @Output() threadEmitter = new EventEmitter<any>();
  constructor(
    private userService: UserService
  ) {
    this.userService.subscribe(new SuccessLoader((user: User) => {
      this.senderId = user.userId;
    }));
  }

  public setFirstThread(): void {
    if (this.threads.length > 0) this.threadEmitter.emit(this.threads.getByIndex(0))
  }

  showMessage(name: string): void {
    this.threadEmitter.emit(name);
  }

  public receiver(thread: Thread): User {
    return thread.receiver(this.senderId);
  }
}

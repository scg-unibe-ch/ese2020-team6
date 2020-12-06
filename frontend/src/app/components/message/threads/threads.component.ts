import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Threads, NullThreads } from 'src/app/models/message/threads.model';
import { Thread, NullThread } from 'src/app/models/message/thread.model';
import { UserService } from 'src/app/services/user/user.service';
import { SuccessLoader } from 'src/app/services/service.module';
import { User } from 'src/app/models/user/user.model';
import { CutUser } from 'src/app/models/user/cut-user.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'threads',
  templateUrl: './threads.component.html',
  styleUrls: ['./threads.component.scss']
})
export class ThreadsComponent {

  public endpointUrl = environment.endpointURL;

  private senderId: number;
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
  constructor(
    private userService: UserService
  ) {
    this.userService.subscribe(new SuccessLoader((user: User) => {
      this.senderId = user.userId;
    }));
  }

  private setFirstThread(): void {
    if (this.threads.length > 0) this.setThread(this.threads.getByIndex(0));
  }

  private setThread(thread: Thread): void {
    this.threadEmitter.emit(thread);
  }

  public showThread(name: string): void {
    this.threadEmitter.emit(name);
  }

  public receiver(thread: Thread): CutUser {
    return thread.receiver(this.senderId);
  }
}

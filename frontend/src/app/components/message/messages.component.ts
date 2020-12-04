import { Component, OnInit } from '@angular/core';
import { Thread, NullThread } from 'src/app/models/message/thread.model';
import { MessageService } from 'src/app/services/message/message.service';
import { Threads, NullThreads } from 'src/app/models/message/threads.model';
import { SuccessLoader } from 'src/app/services/service.module';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  public currentThread: Thread = NullThread.instance();
  public threads: Threads = NullThreads.instance();

  constructor(
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.messageService.subscribe(new SuccessLoader((threads: Threads) => this.threads = threads));
  }

  showThread(thread: Thread): void {
    this.currentThread = thread;
  }

}

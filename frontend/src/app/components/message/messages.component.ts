import { Component, OnInit } from '@angular/core';
import { Thread } from 'src/app/models/message/thread.model';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  public currentThread: Thread;

  constructor() { }

  ngOnInit(): void {
  }

  showThread(thread: Thread): void {
    this.currentThread = thread;
  }

}

import { share } from 'rxjs/operators';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-message-threads',
  templateUrl: './message-threads.component.html',
  styleUrls: ['./message-threads.component.scss']
})
export class MessageThreadsComponent implements OnInit {
  public threads: any;
  @Output() thread = new EventEmitter<any>();
  names: any;
  constructor() { }

  ngOnInit(): void {
    const threadA = {
      name: 'Anton',
      messages: [
        {
          messageId: 1,
          messageThreadId: 1,
          senderId: 4,
          body: 'Hallo',
          createdAt: 20201127_10.30,
          readStatus: true
         },
         {
          messageId: 2,
          messageThreadId: 1,
          senderId: 4,
          body: 'Wie gehts?',
          createdAt: 20201127_10.35,
          readStatus: true
         }
      ],
    };
    const threadM = {
      name: 'Maya',
      messages: [
        {
          messageId: 1,
          messageThreadId: 2,
          senderId: 5,
          body: 'Ich brauche was zu essen',
          createdAt: 20201127_10.35,
          readStatus: true
         },
         {
          messageId: 2,
          messageThreadId: 2,
          senderId: 5,
          body: 'dringend',
          createdAt: 20201127_10.36,
          readStatus: true
         }
      ]
    };
    const threadL = {
      name: 'Leroy',
      messages: [
        {
          messageId: 1,
          messageThreadId: 3,
          senderId: 6,
          body: 'Ich liebe Pizza',
          createdAt: 20201127_10.37,
          readStatus: true
         },
         {
          messageId: 2,
          messageThreadId: 4,
          senderId: 6,
          body: 'Warum habe ich keine Pizza?',
          createdAt: 20201127_10.38,
          readStatus: true
         }
      ]
    };
    const threadS = {
      name: 'Shane',
      messages: [
       {
          messageId: 1,
          messageThreadId: 5,
          senderId: 7,
          body: 'Warum programmieren wir?',
          createdAt: 20201127_10.39,
          readStatus: true
         },
         {
          messageId: 2,
          messageThreadId: 5,
          senderId: 7,
          body: 'Immer wenn etwas geht, ist es gleich wieder kaputt',
          createdAt: 20201127_10.40,
          readStatus: true
         }
      ]
    };
    const threadE = {
      name: 'Elenoi',
      messages: [
        {
          messageId: 1,
          messageThreadId: 6,
          senderId: 8,
          body: 'Hallo',
          createdAt: 20201127_10.40,
          readStatus: true
         }
      ]
    };
    const threadK = {
      name: 'Konstanze',
      messages: [
        {
          messageId: 1,
          messageThreadId: 7,
          senderId: 9,
          body: 'Lalalalalala',
          createdAt: 20201127_10.41,
          readStatus: true
         }
      ]
    };
    this.threads = [threadA, threadM, threadL, threadS, threadE, threadK];
  }

  showMessage(name: string): void {
    this.thread.emit(name);
  }
}

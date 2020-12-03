import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Message } from 'src/app/models/message/message.model';
import { Thread } from 'src/app/models/message/thread.model';
import { Threads } from 'src/app/models/message/threads.model';

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

    let msg7 = new Message(1, 1, 4, 'Hallo', new Date(), true);
    let msg8 = new Message(2, 1, 4, 'Wie gehts?', new Date(), true);
    const threadA = {
      name: 'Anton',
      messages: [msg7, msg8]
    };
    let msg5 = new Message(1, 3, 5, 'Ich brauche was zu essen', new Date(), true);
    let msg6 = new Message(2, 3, 5, 'dringend', new Date(), true);
    const threadM = {
      name: 'Maya',
      messages: [msg5, msg6]
    };
    let msg3 = new Message(1, 3, 6, 'Ich liebe Pizza', new Date(), true);
    let msg4 = new Message(2, 3, 6, 'Warum habe ich keine Pizza?', new Date(), true);
    const threadL = {
      name: 'Leroy',
      messages: [msg3, msg4]
    };

    let msg1 = new Message(1, 5, 7, 'Warum programmieren wir?', new Date(), true);
    let msg2 = new Message(2, 5, 7, 'Immer wenn etwas geht, ist es gleich wieder kaputt', new Date(), true);
    const threadS = {
      name: 'Shane',
      messages: [msg1, msg2]
    };
    let msg = new Message(1, 6, 8, 'Hallo', new Date(), true);
    const threadE = {
      name: 'Elenoi',
      messages: [msg]
    };
    let msg9 = new Message(1, 7, 9, 'Lalalalalala', new Date(), true);
    let msg10 = new Message(2, 7, 9, 'Heeeeey', new Date(), true);
    const threadK = {
      name: 'Konstanze',
      messages: [msg9, msg10]
    };
    this.threads = [threadA, threadM, threadL, threadS, threadE, threadK];
  }

  showMessage(name: string): void {
    this.thread.emit(name);
  }
}

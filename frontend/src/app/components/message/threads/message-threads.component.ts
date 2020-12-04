import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Message } from 'src/app/models/message/message.model';
import { Thread } from 'src/app/models/message/thread.model';
import { Threads } from 'src/app/models/message/threads.model';
import { Product } from 'src/app/models/product/product.model';
import { User } from 'src/app/models/user/user.model';

@Component({
  selector: 'app-message-threads',
  templateUrl: './message-threads.component.html',
  styleUrls: ['./message-threads.component.scss']
})
export class MessageThreadsComponent implements OnInit {
  public threads: any;
  @Output() threadEmitter = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {

    let msg7 = new Message(4, 'Hallo', new Date(), true);
    let msg8 = new Message(4, 'Wie gehts?', new Date(), true);
    const threadA = new Thread(Product.NullProduct, [User.NullUser, User.NullUser], true, [msg7, msg8]);
    let msg5 = new Message(5, 'Ich brauche was zu essen', new Date(), true);
    let msg6 = new Message(5, 'dringend', new Date(), true);
    const threadM = new Thread(Product.NullProduct, [User.NullUser, User.NullUser], true, [msg5, msg6]);

    let msg3 = new Message(6, 'Ich liebe Pizza', new Date(), true);
    let msg4 = new Message(6, 'Warum habe ich keine Pizza?', new Date(), true);
    const threadL = new Thread(Product.NullProduct, [User.NullUser, User.NullUser], true, [msg3, msg4]);

    let msg1 = new Message(7, 'Warum programmieren wir?', new Date(), true);
    let msg2 = new Message(7, 'Immer wenn etwas geht, ist es gleich wieder kaputt', new Date(), true);
    const threadS = new Thread(Product.NullProduct, [User.NullUser, User.NullUser], true, [msg1, msg2]);

    let msg = new Message(8, 'Hallo', new Date(), true);
    const threadE = new Thread(Product.NullProduct, [User.NullUser, User.NullUser], true, [msg]);

    let msg9 = new Message(9, 'Lalalalalala', new Date(), true);
    let msg10 = new Message(9, 'Heeeeey', new Date(), true);
    const threadK = new Thread(Product.NullProduct, [User.NullUser, User.NullUser], true, [msg9, msg10]);

    const threadJ = new Thread(Product.NullProduct, [User.NullUser, User.NullUser], true, []);
    const threadH = new Thread(Product.NullProduct, [User.NullUser, User.NullUser], true, []);
    const threadP = new Thread(Product.NullProduct, [User.NullUser, User.NullUser], true, []);
    const threadN = new Thread(Product.NullProduct, [User.NullUser, User.NullUser], true, []);

    this.threads = [threadA, threadM, threadL, threadS, threadE, threadK, threadJ, threadH, threadP, threadN];
    this.setFirstThread();
  }

  public setFirstThread(): void {

    if (this.threads.length > 0) this.threadEmitter.emit(this.threads[0])
  }

  showMessage(name: string): void {
    this.threadEmitter.emit(name);
  }
}

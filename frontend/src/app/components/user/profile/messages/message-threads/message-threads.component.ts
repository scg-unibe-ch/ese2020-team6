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
  anton = ['Hallo', 'Wie gehts?'];
  maya = ['Ich brauche was zu essen', 'dringend', 'Dringend was zu essen'];
  leroy = ['Ich liebe Pizza', 'Warum habe ich keine Pizza?'];
  shane = ['Warum programmieren wir?', 'Immer wenn etwas geht, ist es gleich wieder kaputt'];
  elenoi = ['Ich habe schon eine Million Mal console.log geschriben', 'Lalalilu'];
  konstanze = ['Bringst du noch Bier mit?', 'Und Chips', 'Warum haben wir nie Chips?'];
  names: any;
  constructor() { }

  ngOnInit(): void {
    const threadA = {
      name: 'Anton',
      messages: this.anton
    };
    const threadM = {
      name: 'Maya',
      messages: this.maya
    };
    const threadL = {
      name: 'Leroy',
      messages: this.leroy
    };
    const threadS = {
      name: 'Shane',
      messages: this.shane
    };
    const threadE = {
      name: 'Elenoi',
      messages: this.elenoi
    };
    const threadK = {
      name: 'Konstanze',
      messages: this.konstanze
    };
    this.threads = [threadA, threadM, threadL, threadS, threadE, threadK];
  }

  showMessage(name: string): void {
    console.log(name, 'iiiiiiiiiiiiiii')
    this.thread.emit(name);
  }
}

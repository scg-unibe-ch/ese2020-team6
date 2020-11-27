import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-message-threads',
  templateUrl: './message-threads.component.html',
  styleUrls: ['./message-threads.component.scss']
})
export class MessageThreadsComponent implements OnInit {
  public threads: any;
  @Output() threadName = new EventEmitter<string>();
  
  constructor() { }

  ngOnInit(): void {
    this.threads = [
      'Anton',
      'Maya',
      'Leroy',
      'Shane',
      'Samir',
      'Elenoi',
      'Konstanze'
    ];
  }

  showMessage(name): void {
    this.threadName.emit(name);
  }
}

import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  public threadName: any;

  constructor() { }

  ngOnInit(): void {
  }

  showMessage(name: string): void {
    this.threadName = name;
  }

}

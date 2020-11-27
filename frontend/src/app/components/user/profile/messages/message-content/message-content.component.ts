import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-message-content',
  templateUrl: './message-content.component.html',
  styleUrls: ['./message-content.component.scss']
})
export class MessageContentComponent implements OnInit {
  public messages: any;
  @Input() thread: any;

  constructor() { }

  ngOnInit(): void {
    this.thread = {
      name: '',
      messages: [],
    };
  }

  method(): void {
    console.log(this.thread);
  }

}

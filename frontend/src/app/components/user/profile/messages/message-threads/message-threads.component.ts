import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-message-threads',
  templateUrl: './message-threads.component.html',
  styleUrls: ['./message-threads.component.scss']
})
export class MessageThreadsComponent implements OnInit {
  public threads: any;
  
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

}

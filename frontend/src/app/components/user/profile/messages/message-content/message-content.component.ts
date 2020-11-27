import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-message-content',
  templateUrl: './message-content.component.html',
  styleUrls: ['./message-content.component.scss']
})
export class MessageContentComponent implements OnInit {
  public messages: any;
  constructor() { }

  ngOnInit(): void {
    this.messages = [
      'Hallo wie geht es dir?',
      'Mir geht es super',
      'Wird das so ein langweiliges Smalltalk?',
      'Ja.'
    ];
  }

}

import { NgForm } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-message-content',
  templateUrl: './message-content.component.html',
  styleUrls: ['./message-content.component.scss']
})
export class MessageContentComponent implements OnInit {
  public messages: any;
  @Input() thread: any;
  answer: any;

  constructor(
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.thread = {
      name: '',
      messages: [],
    };
  }

  sendMessage(answer: NgForm): void {
    if (this.thread.name === '') {
      this.openSnackBar();
    } else {
      const messageId = this.thread.messages[this.thread.messages.length - 1].messageId + 1;
      const messageThread = this.thread.messages[0].messageThreadId;
      const senderId = 1;
      const createdAd = 20201127;
      const readStatus = true;
      this.answer = {
        messageId: messageId,
        messageThreadId: messageThread,
        senderId: senderId,
        body: answer.value,
        createdAt: createdAd,
        readStatus: readStatus
        };
      console.log(this.answer, 'ääääääääääääääääääääääääää')
      this.thread.messages.push(this.answer);
    }
  }

  public openSnackBar(): void {
    this.snackBar.open('Chose someone you want write to.', '', {
      duration: 2000,
      panelClass: ['snackbar']
    });
  }

}

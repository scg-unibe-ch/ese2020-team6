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
      this.answer = answer.value;
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

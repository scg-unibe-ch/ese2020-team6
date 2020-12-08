import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message/message.service';
import { SuccessLoader } from 'src/app/services/service.module';
import { SimpleThread } from 'src/app/models/message/thread.model';
import { Count } from 'src/app/models/count/count.model';

@Component({
  selector: 'app-new-messages',
  templateUrl: '../popup.component.html',
  styleUrls: ['../popup.component.scss']
})
export class NewMessagesComponent implements OnInit {
  public popupNumber: number;
  public popupDisplay = false;
  constructor(
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.messageService.subscribe(new SuccessLoader(() => {
      this.messageService.unreadCount.subscribe((count: Count<SimpleThread>) => {
        this.popupNumber = count.total;
        this.popupDisplay = (count.total !== 0);
      });
    }));
  }

}

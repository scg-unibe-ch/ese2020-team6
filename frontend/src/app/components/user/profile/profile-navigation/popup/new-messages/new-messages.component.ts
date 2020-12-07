import { PopupComponent } from './../../../../../../models/user/profile/navigation/popup/popup.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-messages',
  templateUrl: '../popup.component.html',
  styleUrls: ['../popup.component.scss']
})
export class NewMessagesComponent implements OnInit {
  public popupNumber: number;
  public popupDisplay = false;
  constructor() { }

  ngOnInit(): void {
    this.popupDisplay = true;
    this.popupNumber = 1;
  }

}

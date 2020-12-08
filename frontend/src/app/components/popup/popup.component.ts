import { Component } from '@angular/core';
import { PopupService } from 'src/app/services/popup/popup.service';
import { PopupModel } from 'src/app/models/popup/popup.model';
import { PopupNotClosedError, PopupStillOpenError } from 'src/app/models/error/error.module';

@Component({
  selector: 'popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements PopupModel {

  constructor(
    private popupService: PopupService
  ) {
    this.popupService.addPopup(this)
  }

  public name = 'root';
  public openTime: number = 2000;
  private isOpen: boolean = false;
  private isLanded = true;
  public text: string = '';
  public openAnimationTime = 500;
  public closeAnimationTime = 500;
  private context: string = '';

  open(text: string, context: string): Promise<void> {
    if (this.isOpen) return Promise.reject(new PopupNotClosedError());
    else return new Promise(resolve => {
      this.context = context;
      this.text = text;
      this.isLanded = false;
      this.isOpen = true;
      resolve();
    })
  }
  close(): Promise<void> {
    if (!this.isOpen) return Promise.reject(new PopupStillOpenError());
    else return new Promise(resolve => {
      this.isOpen = false;
      resolve();
    })
  }

  get classes(): Array<string> {
    let classes = new Array<string>();
    classes.push(this.isOpen ? 'open' : 'closed');
    classes.push(this.isLanded ? 'landed' : 'not-landed')
    classes.push(this.context);
    return classes;
  }

}

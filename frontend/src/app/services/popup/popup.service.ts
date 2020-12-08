import { Injectable } from '@angular/core';
import { PopupModel } from 'src/app/models/popup/popup.model';
import { PopupNotClosedError } from 'src/app/models/error/popup.error';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  private popups: Array<PopupModel> = new Array<PopupModel>();
  private queue: Array<{name: string, text: string, data: any}> = new Array<{name: string, text: string, data: any}>();

  constructor() { }

  public addPopup(popup: PopupModel): void {
    this.popups.push(popup);
  };
  public openPopup(name: string, text: string, data: any): void {
    let foundPopup: PopupModel = this.popups.find((popup: PopupModel) => popup.name === name);
    foundPopup.open(text, data)
    .then(() => this.sleep(foundPopup.openAnimationTime))
    .then(() => this.sleep(foundPopup.openTime))
    .then(() => foundPopup.close())
    .then(() => this.sleep(foundPopup.closeAnimationTime))
    .then(() => {
      let next = this.queue.reverse().pop();
      this.queue.reverse();
      this.openPopup(next.name, next.text, next.data);
    })
    .catch((error: any) => {
      if (error instanceof PopupNotClosedError) {
        this.queue.push({name, text, data})
      }
    });
  };

  private sleep(time: number): Promise<void> {
   return new Promise(resolve => setTimeout(resolve, time));
  }
}

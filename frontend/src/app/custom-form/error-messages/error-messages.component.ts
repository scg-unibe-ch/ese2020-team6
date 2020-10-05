import { Component, Input } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';

@Component({
  selector: 'app-error-messages',
  templateUrl: './error-messages.component.html',
  styleUrls: ['./error-messages.component.css']
})
export class ErrorMessagesComponent {

  @Input()
  form: NgForm;

  getControls(): FormControl[] {
    let keyControlArray = Object.entries(this.form.form.controls);
    let controlArray: FormControl[] = new Array();
    keyControlArray.forEach((element: [string, FormControl]) => {
      controlArray.push(element[1]);
    });
    return controlArray;
  }

}

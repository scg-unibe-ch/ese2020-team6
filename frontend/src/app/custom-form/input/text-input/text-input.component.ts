import { Component, Input, ViewChild } from '@angular/core';
import { NgModel, NG_VALUE_ACCESSOR, NG_VALIDATORS, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { ValueAccessorBase } from '../../value-accessor-base';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: TextInputComponent, multi: true}
  ]
})
export class TextInputComponent extends ValueAccessorBase<String> {
  @Input()
  placeholder: String;

  @ViewChild(NgModel)
  model: NgModel;

  constructor() {
    super();
  }
}

import { Component, Input, Output, EventEmitter, Optional, Inject, ViewChild } from '@angular/core';
import { NgModel, NG_VALUE_ACCESSOR, NG_VALIDATORS, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { ValueAccessorBase } from '../../value-accessor-base';
import { RegisterUser } from "../../models/register-user.model";

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

  constructor(
    @Optional() @Inject(NG_VALIDATORS) private validators: Array<any>,
    @Optional() @Inject(NG_ASYNC_VALIDATORS) private asyncValidators: Array<any>
  ) {
    super();
  }
}

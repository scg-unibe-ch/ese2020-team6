import { Component, Input, Output, EventEmitter, Optional, Inject, ViewChild } from '@angular/core';
import { NgModel, NG_VALUE_ACCESSOR, NG_VALIDATORS, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { ValueAccessorBase } from '../../value-accessor-base';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.css'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: PasswordInputComponent, multi: true}
  ]
})
export class PasswordInputComponent extends ValueAccessorBase<String> {
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

import { Component, Input, Optional, Inject, ViewChild } from '@angular/core';
import { NgModel, NG_VALUE_ACCESSOR, NG_VALIDATORS, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { ValueAccessorValidatorBase } from '../../value-accessor-validator-base';

@Component({
  selector: 'app-password-input',
  templateUrl: '../input.component.html',
  styleUrls: ['../input.component.css'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: PasswordInputComponent, multi: true}
  ]
})
export class PasswordInputComponent extends ValueAccessorValidatorBase<String> {
  type: string = "password";

  @Input()
  placeholder: String;

  @ViewChild(NgModel)
  model: NgModel;

  constructor(
    @Optional() @Inject(NG_VALIDATORS) validators: Array<any>,
    @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<any>
  ) {
    super(validators, asyncValidators);
  }
}

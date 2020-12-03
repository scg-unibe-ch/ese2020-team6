import { Component, Input, Optional, Inject, ViewChild } from '@angular/core';
import { NgModel, NG_VALUE_ACCESSOR, NG_VALIDATORS, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { ValueAccessorValidatorBase } from '../../value-accessor-validator-base';

@Component({
  selector: 'app-text-input',
  templateUrl: './input-base.component.html',
  styleUrls: ['./input-base.component.scss'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: TextInputComponent, multi: true}
  ]
})
export class TextInputComponent  extends ValueAccessorValidatorBase<String> {
  public type: string = "text";

  @Input()
  public showError: boolean = true;

  @Input()
  public placeholder: String;

  @ViewChild(NgModel)
  public model: NgModel;

  constructor(
    @Optional() @Inject(NG_VALIDATORS) validators: Array<any>,
    @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<any>
  ) {
    super(validators, asyncValidators);
  }
}

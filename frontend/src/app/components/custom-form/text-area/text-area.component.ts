import { Component, Input, Optional, Inject, ViewChild } from '@angular/core';
import { NgModel, NG_VALUE_ACCESSOR, NG_VALIDATORS, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { ValueAccessorValidatorBase } from '../value-accessor-validator-base';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: [
    '../input/base/input-base.component.scss',
    '../input/base/input-base.component.theme.scss'
  ],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: TextAreaComponent, multi: true}
  ]
})
export class TextAreaComponent  extends ValueAccessorValidatorBase<String> {
  @Input()
  public rows: number;

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

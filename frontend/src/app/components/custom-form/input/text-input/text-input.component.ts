import { Component, Input, Optional, Inject, ViewChild } from '@angular/core';
import { NgModel, NG_VALUE_ACCESSOR, NG_VALIDATORS, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { ValueAccessorValidatorBase } from '../../value-accessor-validator-base';
import { ThemeService } from '../../../../services/theme/theme.service';

@Component({
  selector: 'app-text-input',
  templateUrl: '../input.component.html',
  styleUrls: ['../input.component.scss'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: TextInputComponent, multi: true}
  ]
})
export class TextInputComponent  extends ValueAccessorValidatorBase<String> {
  public type: string = "text";

  @Input()
  public placeholder: String;

  @ViewChild(NgModel)
  public model: NgModel;

  constructor(
    themeService: ThemeService,
    @Optional() @Inject(NG_VALIDATORS) validators: Array<any>,
    @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<any>
  ) {
    super(validators, asyncValidators, themeService);
  }
}

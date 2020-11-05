import { Component, Input, Optional, Inject, ViewChild } from '@angular/core';
import { NgModel, NG_VALUE_ACCESSOR, NG_VALIDATORS, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { ValueAccessorBase } from '../../value-accessor-base';
import { ThemeService } from '../../../../services/theme/theme.service';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: RadioComponent, multi: true}
  ]
})
export class RadioComponent extends ValueAccessorBase<any> {
  public type: string = "radio";

  @Input()
  public placeholder: string;

  @Input()
  public options: Array<[string, any]> = new Array<[string, any]>();

  constructor(
    themeService: ThemeService
  ) {
    super(themeService);
  }

  public onSelect(option: string) {
    this.value = option;
  }

  public writeValue(value: string) {
    super.writeValue(value);
    if (value) {
      this.dirty = true;
      this.onChange(value);
    }
  }
}

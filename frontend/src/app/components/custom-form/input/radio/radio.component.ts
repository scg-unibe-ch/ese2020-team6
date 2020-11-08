import { Component, Input, ContentChildren, QueryList, TemplateRef } from '@angular/core';
import { NgModel, NG_VALUE_ACCESSOR, NG_VALIDATORS, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { ValueAccessorBase } from '../../value-accessor-base';
import { ThemeService } from '../../../../services/theme/theme.service';
import { RadioLabelDirective } from '../../../custom-form/input/radio/label/radio-label.directive';

@Component({
  selector: 'radio-selection',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: RadioComponent, multi: true}
  ]
})
export class RadioComponent<T> extends ValueAccessorBase<T> {
  public type: string = "radio";

  @Input()
  public placeholder: string;

  @Input()
  set options(options: Array<[string, T]>) {
    this.value = options[0][1];
    this._options = options;
  }
  get options(): Array<[string, T]> {
    return this._options;
  }
  private _options: Array<[string, T]> = new Array<[string, T]>();

  public optionsWithTemplate: Array<[string, T, TemplateRef<any>]> = new Array<[string, T, TemplateRef<any>]>();

  @ContentChildren(RadioLabelDirective)
  set labels(labels: QueryList<RadioLabelDirective>) {
    this.optionsWithTemplate = this.options.map((option: [string, T], optionId: number) => {
      const labelTemplate: TemplateRef<any> = this.getTemplateById(labels, optionId);

      return [option[0], option[1], labelTemplate];
    });
  }

  private getTemplateById(labels: QueryList<RadioLabelDirective>, optionId: number): TemplateRef<any> {
    let labelTemplate: TemplateRef<any>;
    labels.toArray().every((label: RadioLabelDirective) => {
      if (label.optionId == optionId) {
        labelTemplate = label.template;
        return false;
      } else return true;
    });
    return labelTemplate;
  }

  constructor(
    themeService: ThemeService
  ) {
    super(themeService);
  }

  public onSelect(option: T) {
    this.value = option;
  }

  public writeValue(value: T) {
    super.writeValue(value);
    if (value) {
      this.dirty = true;
      this.onChange(value);
    }
  }
}

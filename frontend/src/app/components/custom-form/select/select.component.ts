import { Component, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR} from '@angular/forms';
import { ValueAccessorBase } from '../value-accessor-base';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: SelectComponent, multi: true}
  ]
})
export class SelectComponent extends ValueAccessorBase<String> implements OnInit {

  @Input()
  public placeholder: String;

  @Input()
  public selectName: String;

  @Input()
  public options: Array<String> = new Array<String>();

  public optionsHidden: Boolean = true;
  public current: String;

  constructor() {
    super();
  }

  public ngOnInit(): void {
    this.current = this.selectName;
  }

  public onShowOptions() {
    this.optionsHidden = !this.optionsHidden;
  }

  public onSelect(option: string) {
    this.value = option;
    this.current = option;

    this.onShowOptions();
  }

  public writeValue(value: string) {
    if (value) {
      this.value = value;
      this.current = value;
    }
  }

  public getPlaceholderClass() {
    return this.value === this.selectName ? 'placeholder-notSelected' : '';
  }

  public getSVGClass() {
    return this.optionsHidden ? 'down' : 'up';
  }

}

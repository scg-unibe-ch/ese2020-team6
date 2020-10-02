import { Component, Input, Optional, Inject, ViewChild, OnInit } from '@angular/core';
import { NgModel, NG_VALUE_ACCESSOR, NG_VALIDATORS, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { ValueAccessorBase } from '../value-accessor-base';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: SelectComponent, multi: true}
  ]
})
export class SelectComponent extends ValueAccessorBase<String> implements OnInit {

  @Input()
  selectName: String;

  @Input()
  options: Array<String> = new Array<String>();

  optionsHidden: Boolean = true;
  current: String;

  constructor(
    @Optional() @Inject(NG_VALIDATORS) private validators: Array<any>,
    @Optional() @Inject(NG_ASYNC_VALIDATORS) private asyncValidators: Array<any>
  ) {
    super();
  }

  ngOnInit(): void {
    this.current = this.selectName;
  }

  onShowOptions() {
    this.optionsHidden = !this.optionsHidden;
  }

  onSelect(option: String) {
    this.value = option;
    this.current = option;
    this.onShowOptions();
  }

  getPlaceholderClass() {
    return this.value === this.selectName ? 'placeholder-notSelected' : '';
  }

  getSVGClass() {
    return this.optionsHidden ? 'down' : 'up';
  }

}

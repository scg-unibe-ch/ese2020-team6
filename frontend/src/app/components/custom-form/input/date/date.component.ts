import { Component, Input, Optional, Inject, ViewChild } from '@angular/core';
import { NgModel, NG_VALUE_ACCESSOR, NG_VALIDATORS, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { ValueAccessorValidatorBase } from '../../value-accessor-validator-base';
import { ThemeService } from '../../../../services/theme/theme.service';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: DateComponent, multi: true}
  ]
})
export class DateComponent  extends ValueAccessorValidatorBase<String> {
  public type: string = "datetime-local";

  @Input()
  public showError: boolean = true;

  @Input()
  public placeholder: string;

  @Input()
  public min: string;

  @Input()
  public max: string;

  @ViewChild(NgModel)
  model: NgModel;

  constructor(
    themeService: ThemeService,
    @Optional() @Inject(NG_VALIDATORS) validators: Array<any>,
    @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<any>
  ) {
    super(validators, asyncValidators, themeService);
  }

  get minDate(): string {
    return this.isoString(this.min);
  }

  get maxDate(): string {
    return this.isoString(this.max);
  }

  private isoString(date: string): string {
    if (date === 'today') {
      return this.todayISOString;
    } else if (date === 'tomorrow') {
      return this.tomorrowISOString;
    } else return date;
  }

  get todayISOString(): string {
    let today: Date = new Date();
    return this.trimISOString(today.toISOString());
  }

  get tomorrowISOString(): string {
    let tomorrow: Date = new Date();
    tomorrow.setDate(tomorrow.getDate()+1);
    return this.trimISOString(tomorrow.toISOString());
  }

  private trimISOString(isoString: string): string {
    let untrimmedISOArray: Array<string> = isoString.split(":").reverse();
    untrimmedISOArray[0] = null;

    let trimmedISOArray: Array<string> = untrimmedISOArray.reduce((trimmedISOArray: Array<string>, untrimmedISOArrayPart: string) => {
      if (untrimmedISOArrayPart) trimmedISOArray.push(untrimmedISOArrayPart);
      return trimmedISOArray;
    }, []).reverse();

    let trimmedISOString: string = trimmedISOArray.join(":");
    return trimmedISOString;
  }
}

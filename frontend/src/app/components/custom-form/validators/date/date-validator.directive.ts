import { Directive } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidationErrors  } from '@angular/forms';
import { RegexValidatorBase , validatorRegex } from '../regex/regex-validator-base';

@Directive({
  selector: '[appDateValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: DateValidatorDirective,
    multi: true
  }]
})
export class DateValidatorDirective extends RegexValidatorBase {
  constructor() {
    super(validatorRegex.date);
  }

  validate(control: AbstractControl): ValidationErrors | null {
    let regexResults: ValidationErrors | null = super.validate(control);
    if(!regexResults) {
      let parsedDate: Date = new Date(control.value);
      let currentDate: Date = new Date();
      currentDate.setSeconds(0);
      currentDate.setMilliseconds(0);
      var difference = parsedDate.getTime() - currentDate.getTime();
      if (difference <= 0) {
        return {errorMessage: {name: this.regExValidatorName, message: 'Please Choose a date in the future.'}}
      } else return null;
    } else return regexResults;
  }
}

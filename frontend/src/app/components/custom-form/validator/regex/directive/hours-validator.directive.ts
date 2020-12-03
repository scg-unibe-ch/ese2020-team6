import { Directive } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
import { RegexValidatorBase , validatorRegex } from '../regex-validator-base';

@Directive({
  selector: '[hoursValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: HoursValidator,
    multi: true
  }]
})
export class HoursValidator extends RegexValidatorBase {
  constructor() {
    super(validatorRegex.hours);
  }
}

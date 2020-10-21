import { Directive } from '@angular/core';
import { NG_VALIDATORS, AbstractControl } from '@angular/forms';
import { RegexValidatorBase , validatorRegex } from '../regex-validator-base';

@Directive({
  selector: '[appLocationValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: LocationValidatorDirective,
    multi: true
  }]
})
export class LocationValidatorDirective extends RegexValidatorBase {
  constructor() {
    super(validatorRegex.location);
  }
}

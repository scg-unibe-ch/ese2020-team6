import { Directive } from '@angular/core';
import { NG_VALIDATORS, AbstractControl } from '@angular/forms';
import { RegexValidatorBase , validatorRegex } from '../regex-validator-base';

@Directive({
  selector: '[appGenderValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: GenderValidatorDirective,
    multi: true
  }]
})
export class GenderValidatorDirective extends RegexValidatorBase {
  constructor() {
    super(validatorRegex.gender);
  }
}

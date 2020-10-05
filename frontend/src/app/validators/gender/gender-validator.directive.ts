import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator , AbstractControl } from '@angular/forms';
import { RegexValidatorBase , validatorRegex } from '../regex-validator-base';

@Directive({
  selector: '[appGenderValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: GenderValidatorDirective,
    multi: true
  }]
})
export class GenderValidatorDirective extends RegexValidatorBase implements Validator{
  constructor() {
    super(validatorRegex.gender.regex, validatorRegex.gender.name)
  }
}

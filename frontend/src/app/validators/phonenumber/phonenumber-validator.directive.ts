import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator , AbstractControl } from '@angular/forms';
import { RegexValidatorBase , validatorRegex } from '../regex-validator-base';

@Directive({
  selector: '[appPhonenumberValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: PhonenumberValidatorDirective,
    multi: true
  }]
})
export class PhonenumberValidatorDirective extends RegexValidatorBase implements Validator{
  constructor() {
    super(validatorRegex.phonenumber.regex, validatorRegex.phonenumber.name)
  }
}

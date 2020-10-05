import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator , AbstractControl } from '@angular/forms';
import { RegexValidatorBase , validatorRegex } from '../regex-validator-base';

@Directive({
  selector: '[appUsernameValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: UsernameValidatorDirective,
    multi: true
  }]
})
export class UsernameValidatorDirective extends RegexValidatorBase implements Validator{
  constructor() {
    super(validatorRegex.username.regex, validatorRegex.username.name)
  }
}

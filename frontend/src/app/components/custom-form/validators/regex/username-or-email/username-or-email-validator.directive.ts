import { Directive } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
import { RegexValidatorBase , validatorRegex } from '../regex-validator-base';

@Directive({
  selector: '[appUsernameOrEmailValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: UsernameOrEmailValidatorDirective,
    multi: true
  }]
})
export class UsernameOrEmailValidatorDirective extends RegexValidatorBase {
  constructor() {
    super(validatorRegex.usernameOrEmail);
  }
}

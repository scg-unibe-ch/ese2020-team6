import { Directive } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
import { RegexValidatorBase , validatorRegex } from '../regex-validator-base';

@Directive({
  selector: '[appUsernameValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: UsernameValidator,
    multi: true
  }]
})
export class UsernameValidator extends RegexValidatorBase {
  constructor() {
    super(validatorRegex.username);
  }
}

import { Directive } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';
import { RegexValidatorBase , validatorRegex } from '../regex-validator-base';

@Directive({
  selector: '[appPasswordValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: PasswordValidator,
    multi: true
  }]
})
export class PasswordValidator  extends RegexValidatorBase {
  constructor() {
    super(validatorRegex.password);
  }
}

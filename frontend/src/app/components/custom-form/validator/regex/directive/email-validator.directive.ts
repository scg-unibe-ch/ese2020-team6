import { Directive } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
import { RegexValidatorBase , validatorRegex } from '../regex-validator-base';

@Directive({
  selector: '[appEmailValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: EmailValidator,
    multi: true
  }]
})
export class EmailValidator extends RegexValidatorBase {
  constructor() {
    super(validatorRegex.email);
  }
}

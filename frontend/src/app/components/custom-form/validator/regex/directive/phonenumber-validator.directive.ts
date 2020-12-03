import { Directive } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
import { RegexValidatorBase , validatorRegex } from '../regex-validator-base';

@Directive({
  selector: '[appPhonenumberValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: PhonenumberValidator,
    multi: true
  }]
})
export class PhonenumberValidator extends RegexValidatorBase {
  constructor() {
    super(validatorRegex.phonenumber);
  }
}

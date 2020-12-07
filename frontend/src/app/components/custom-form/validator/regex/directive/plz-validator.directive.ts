import { Directive } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
import { RegexValidatorBase , validatorRegex } from '../regex-validator-base';

@Directive({
  selector: '[appPlzValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: PlzValidator,
    multi: true
  }]
})
export class PlzValidator extends RegexValidatorBase {
  constructor() {
    super(validatorRegex.plz);
  }
}

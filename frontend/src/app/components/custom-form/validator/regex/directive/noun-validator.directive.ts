import { Directive } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
import { RegexValidatorBase , validatorRegex } from '../regex-validator-base';

@Directive({
  selector: '[appNounValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: NounValidator,
    multi: true
  }]
})
export class NounValidator extends RegexValidatorBase {
  constructor() {
    super(validatorRegex.noun);
  }
}

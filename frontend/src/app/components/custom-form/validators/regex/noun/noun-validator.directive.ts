import { Directive } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
import { RegexValidatorBase , validatorRegex } from '../regex-validator-base';

@Directive({
  selector: '[appNounValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: NounValidatorDirective,
    multi: true
  }]
})
export class NounValidatorDirective extends RegexValidatorBase {
  constructor() {
    super(validatorRegex.noun);
  }
}

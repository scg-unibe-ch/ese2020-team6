import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator , AbstractControl } from '@angular/forms';
import { RegexValidatorBase , validatorRegex } from '../regex-validator-base';

@Directive({
  selector: '[appNounValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: NounValidatorDirective,
    multi: true
  }]
})
export class NounValidatorDirective extends RegexValidatorBase implements Validator{
  constructor() {
    super(validatorRegex.noun);
  }
}

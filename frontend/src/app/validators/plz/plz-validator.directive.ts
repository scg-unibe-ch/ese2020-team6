import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator , AbstractControl } from '@angular/forms';
import { RegexValidatorBase , validatorRegex } from '../regex-validator-base';

@Directive({
  selector: '[appPlzValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: PlzValidatorDirective,
    multi: true
  }]
})
export class PlzValidatorDirective extends RegexValidatorBase implements Validator{
  constructor() {
    super(validatorRegex.plz);
  }
}

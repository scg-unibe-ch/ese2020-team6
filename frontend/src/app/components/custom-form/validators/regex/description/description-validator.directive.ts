import { Directive } from '@angular/core';
import { NG_VALIDATORS, AbstractControl } from '@angular/forms';
import { RegexValidatorBase , validatorRegex } from '../regex-validator-base';

@Directive({
  selector: '[appDescriptionValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: DescriptionValidatorDirective,
    multi: true
  }]
})
export class DescriptionValidatorDirective  extends RegexValidatorBase {
  constructor() {
    super(validatorRegex.description);
  }
}

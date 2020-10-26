import { Directive } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
import { SelectValidatorBase, validatorSelect } from '../select-validator-base';

@Directive({
  selector: '[appGenderValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: GenderValidatorDirective,
    multi: true
  }]
})
export class GenderValidatorDirective extends SelectValidatorBase {
  constructor() {
    super(validatorSelect.gender);
  }
}

import { Directive } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
import { SelectValidatorBase, validatorSelect } from '../select-validator-base';

@Directive({
  selector: '[appGenderValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: GenderValidator,
    multi: true
  }]
})
export class GenderValidator extends SelectValidatorBase {
  constructor() {
    super(validatorSelect.gender);
  }
}

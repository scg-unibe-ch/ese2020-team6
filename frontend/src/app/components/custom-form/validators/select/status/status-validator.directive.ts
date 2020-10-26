import { Directive } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
import { SelectValidatorBase, validatorSelect } from '../select-validator-base';

@Directive({
  selector: '[appStatusValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: StatusValidatorDirective,
    multi: true
  }]
})
export class StatusValidatorDirective  extends SelectValidatorBase {
  constructor() {
    super(validatorSelect.status);
  }
}

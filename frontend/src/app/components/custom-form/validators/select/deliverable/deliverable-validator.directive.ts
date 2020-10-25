import { Directive } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
import { SelectValidatorBase, validatorSelect } from '../select-validator-base';

@Directive({
  selector: '[appDeliverableValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: DeliverableValidatorDirective,
    multi: true
  }]
})
export class DeliverableValidatorDirective extends SelectValidatorBase {
  constructor() {
    super(validatorSelect.deliverable);
  }
}

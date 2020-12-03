import { Directive } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
import { SelectValidatorBase, validatorSelect } from '../select-validator-base';

@Directive({
  selector: '[appOfferTypeValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: OfferTypeValidator,
    multi: true
  }]
})
export class OfferTypeValidator extends SelectValidatorBase {
  constructor() {
    super(validatorSelect.offerType);
  }
}

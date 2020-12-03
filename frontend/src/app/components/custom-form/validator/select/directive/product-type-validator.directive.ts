import { Directive } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
import { SelectValidatorBase, validatorSelect } from '../select-validator-base';

@Directive({
  selector: '[appProductTypeValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ProductTypeValidator,
    multi: true
  }]
})
export class ProductTypeValidator extends SelectValidatorBase {
  constructor() {
    super(validatorSelect.productType);
  }
}

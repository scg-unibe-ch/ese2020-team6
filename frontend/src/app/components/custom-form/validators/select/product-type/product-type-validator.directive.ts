import { Directive } from '@angular/core';
import { NG_VALIDATORS , AbstractControl } from '@angular/forms';
import { SelectValidatorBase, validatorSelect } from '../select-validator-base';

@Directive({
  selector: '[appProductTypeValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ProductTypeValidatorDirective,
    multi: true
  }]
})
export class ProductTypeValidatorDirective extends SelectValidatorBase {
  constructor() {
    super(validatorSelect.productType);
  }
}

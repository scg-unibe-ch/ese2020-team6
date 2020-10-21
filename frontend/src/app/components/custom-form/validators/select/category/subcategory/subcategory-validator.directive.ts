import { Directive } from '@angular/core';
import { NG_VALIDATORS , AbstractControl } from '@angular/forms';
import { SelectValidatorBase, validatorSelect } from '../../select-validator-base';
@Directive({
  selector: '[appSubcategoryValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: SubcategoryValidatorDirective,
    multi: true
  }]
})
export class SubcategoryValidatorDirective extends SelectValidatorBase {
  constructor() {
    super(validatorSelect.subcategory);
  }
}

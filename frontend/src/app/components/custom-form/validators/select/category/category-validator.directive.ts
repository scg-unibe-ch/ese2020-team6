import { Directive } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
import { SelectValidatorBase, validatorSelect } from '../select-validator-base';

@Directive({
  selector: '[appCategoryValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: CategoryValidatorDirective,
    multi: true
  }]
})
export class CategoryValidatorDirective extends SelectValidatorBase {
  constructor() {
    super(validatorSelect.category);
  }
}

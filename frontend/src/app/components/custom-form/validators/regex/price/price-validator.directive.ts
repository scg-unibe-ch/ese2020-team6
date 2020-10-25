import { Directive } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
import { RegexValidatorBase , validatorRegex } from '../regex-validator-base';

@Directive({
  selector: '[appPriceValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: PriceValidatorDirective,
    multi: true
  }]
})
export class PriceValidatorDirective extends RegexValidatorBase {
  constructor() {
    super(validatorRegex.price);
  }
}

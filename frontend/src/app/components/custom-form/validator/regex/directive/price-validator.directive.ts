import { Directive } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
import { RegexValidatorBase , validatorRegex } from '../regex-validator-base';

@Directive({
  selector: '[appPriceValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: PriceValidator,
    multi: true
  }]
})
export class PriceValidator extends RegexValidatorBase {
  constructor() {
    super(validatorRegex.price);
  }
}

import { Directive } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
import { RegexValidatorBase , validatorRegex } from '../regex-validator-base';

@Directive({
  selector: '[appHouseNumberValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: HouseNumberValidator,
    multi: true
  }]
})
export class HouseNumberValidator extends RegexValidatorBase {
  constructor() {
    super(validatorRegex.houseNumber);
  }
}

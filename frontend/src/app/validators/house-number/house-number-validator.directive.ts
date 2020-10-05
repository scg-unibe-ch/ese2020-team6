import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator , AbstractControl } from '@angular/forms';
import { RegexValidatorBase , validatorRegex } from '../regex-validator-base';

@Directive({
  selector: '[appHouseNumberValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: HouseNumberValidatorDirective,
    multi: true
  }]
})
export class HouseNumberValidatorDirective extends RegexValidatorBase implements Validator{
  constructor() {
    super(validatorRegex.houseNumber);
  }
}

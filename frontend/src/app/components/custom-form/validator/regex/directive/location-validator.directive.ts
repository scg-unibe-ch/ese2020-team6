import { Directive } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
import { RegexValidatorBase , validatorRegex } from '../regex-validator-base';

@Directive({
  selector: '[appLocationValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: LocationValidator,
    multi: true
  }]
})
export class LocationValidator extends RegexValidatorBase {
  constructor() {
    super(validatorRegex.location);
  }
}

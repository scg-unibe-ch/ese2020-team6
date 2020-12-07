import { Directive } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
import { RegexValidatorBase , validatorRegex } from '../regex-validator-base';

@Directive({
  selector: '[appDescriptionValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: DescriptionValidator,
    multi: true
  }]
})
export class DescriptionValidator  extends RegexValidatorBase {
  constructor() {
    super(validatorRegex.description);
  }
}

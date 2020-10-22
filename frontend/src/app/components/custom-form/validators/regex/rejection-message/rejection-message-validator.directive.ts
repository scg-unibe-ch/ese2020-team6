import { Directive } from '@angular/core';
import { NG_VALIDATORS, AbstractControl } from '@angular/forms';
import { RegexValidatorBase , validatorRegex } from '../regex-validator-base';

@Directive({
  selector: '[appRejectionMessageValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: RejectionMessageValidatorDirective,
    multi: true
  }]
})
export class RejectionMessageValidatorDirective extends RegexValidatorBase {
  constructor() {
    super(validatorRegex.rejectionMessage);
  }
}

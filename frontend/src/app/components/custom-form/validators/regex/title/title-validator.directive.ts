import { Directive } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
import { RegexValidatorBase , validatorRegex } from '../regex-validator-base';

@Directive({
  selector: '[appTitleValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: TitleValidatorDirective,
    multi: true
  }]
})
export class TitleValidatorDirective extends RegexValidatorBase {
  constructor() {
    super(validatorRegex.title);
  }
}

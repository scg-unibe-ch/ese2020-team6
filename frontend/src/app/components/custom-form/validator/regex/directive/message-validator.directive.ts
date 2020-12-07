import { Directive } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
import { RegexValidatorBase , validatorRegex } from '../regex-validator-base';

@Directive({
  selector: '[messageValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: MessageValidator,
    multi: true
  }]
})
export class MessageValidator  extends RegexValidatorBase {
  constructor() {
    super(validatorRegex.message);
  }
}

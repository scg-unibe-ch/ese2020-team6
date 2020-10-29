import { Directive } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';
import { RegexValidatorBase , validatorRegex } from '../regex/regex-validator-base';

@Directive({
  selector: '[appPasswordValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: PasswordValidatorDirective,
    multi: true
  }]
})
export class PasswordValidatorDirective  extends RegexValidatorBase {
  constructor() {
    super(validatorRegex.password);
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (control.value != null) {
      let contains = this.regexValidator.contains;

      let testResults = contains.map(tester => {
        if (!tester.regExp.test(control.value)) {
          return {errorMessage: {name: this.regExValidatorName, message: tester.error}};
        };
      });


      return null;
    }
    return {errorMessage: {name: this.regExValidatorName, message: 'Must contain a value!'}}
  }
}

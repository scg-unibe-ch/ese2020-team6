import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator , AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appPasswordMatchValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: PasswordMatchValidator,
    multi: true
  }]
})
export class PasswordMatchValidator implements Validator {

  validate(control: AbstractControl): {[key: string]: any} | null {
    if (control.value != null) {
      let password: AbstractControl = control.get("password");
      let repeatPassword: AbstractControl = control.get("repeatPassword");

      if (password != null && repeatPassword != null) {
        if (password.value != null && repeatPassword.value != null) {
          if (password.value === repeatPassword.value) return null;
        }
      }

    }
    return {
      crossFieldPassword: {
        errorName: "ErrorName",
        errorMessages: ["Passwords do not match"]
      }
    };
  }
}

import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator , AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appPasswordMatchValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: PasswordMatchValidatorDirective,
    multi: true
  }]
})
export class PasswordMatchValidatorDirective implements Validator {

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
    return {errorMessage: {name: "passwordMatchValidator", message: "The password and its repetition do not match!"}};
  }
}

import { AbstractControl, Validator, ValidationErrors } from '@angular/forms';
import { RegexValidatorModel } from '../../../../models/custom-form/regex-validator.model';

export class RegexValidatorBase implements Validator {
  regExp: RegExp;
  regExValidatorName: string;
  errorMessage: string;
  private onChange: () => void = () => {};

  constructor(
    protected regexValidator: RegexValidatorModel
  ){
    this.regExp = regexValidator.regex;
    this.regExValidatorName = regexValidator.name.toString();
    this.errorMessage = regexValidator.errorMessage;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (control.value != null) {
      if (this.regExp.test(control.value))
      {
        return null;
      }
    }
    return {errorMessage: {name: this.regExValidatorName, message: this.errorMessage}};
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onChange = fn;
  }
}

class ValueContains {
  oneNumber: { regExp: RegExp, error: string } = {
    regExp: /(?=\d)/,
    error: 'You have to use at least one Number.'
  };
  oneCapLetter: { regExp: RegExp, error: string } = {
    regExp: /(?=[A-Z])/,
    error: 'You have to use at least one capital letter.'
  };
}

const valueContains: ValueContains = new ValueContains();


export const validatorRegex = {
  noun: {
    regex: /^[A-ZÄÖÜ][a-z_äÄöÖüÜ]*$/,
    name: "nounValidator",
    errorMessage: "Start with a capital Letter!"
  },
  username: {
    regex: /^[A-Za-z_äÄöÖüÜ\d@$!%*#?&]{5,255}$/,
    name: "usernameValidator",
    errorMessage: "Min. of 5 characters including numbers and special characters: @$!%*#?&"
  },
  phonenumber: {
    regex: /^(?=.{9,15})(([+]\d+ ){0,1}|0)[\d ]*$/,
    name: "phonenumberValidator",
    errorMessage: "Min. length of 9 numbers and max. length of 15 numbers."
  },
  plz: {
    regex: /^\d{3,10}$/,
    name: "plzValidator",
    errorMessage: "Inbetween three and ten numbers!"
  },
  houseNumber: {
    regex: /^[A-Za-z_äÄöÖüÜ\d]{1,}$/,
    name: "houseNumberValidator",
    errorMessage: "At least one character!"
  },
  email: {
    regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z_äÄöÖüÜ\-0-9]+\.)+[a-zA-Z_äÄöÖüÜ]{2,}))$/,
    name: "emailValidator",
    errorMessage: "Not a valid Email-Address!"
  },
  password: {
    regex: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[@$!%*#?&])[A-Za-z_äÄöÖüÜ\d@$!%*#?&]{7,}$/,
    name: "passwordValidator",
    contains: [
      valueContains.oneNumber,
      valueContains.oneCapLetter
    ],
    errorMessage: "Min. 7 characters, at least 1 capital letter, 1 lowercase letter, 1 number and 1 special character: @$!%*#?&"
  },
  usernameOrEmail: {
    regex: /^((([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z_äÄöÖüÜ\-0-9]+\.)+[a-zA-Z_äÄöÖüÜ]{2,}))|[A-Za-z_äÄöÖüÜ\d@$!%*#?&]{5,})$/,
    name: "usernameOrEmailValidator",
    errorMessage: "You either need to enter your username or your email address."
  },
  title: {
    regex: /^(.|\s){5,}$/,
    name: "titleValidatdor",
    errorMessage: "Min. length of 5 and characters."
  },
  description: {
    regex: /^(.|\s){50,}$/,
    name: "descriptionValidatdor",
    errorMessage: "Min. length of 50 characters."
  },
  price: {
    regex: /^\d*([.]\d{1,})?$/,
    name: "priceValidator",
    errorMessage: "You can either enter an Integer or a Float."
  },
  location: {
    regex: /^[A-ZÄÖÜ][A-Za-z_äÄöÖüÜ\d,\-., ]{1,}$/,
    name: "locationValidator",
    errorMessage: "You can either enter an Integer, Float or limited special characters (-.,). Has to start with a capital letter."
  },
  date: {
    regex: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|(1|2)[0-9]|3[0-1])T(0[1-9]|1[0-9]|2[0-3]):(0[0-9]|([1-5])[0-9])$/,
    name: "dateValidator",
    errorMessage: "Please choose a date."
  },
  rejectionMessage: {
    regex: /^[A-ZÄÖÜ]([A-Za-z_äÄöÖüÜ\d@$!%*#?&,.\- ]){50,}$/,
    name: "rejectionMessageValidator",
    errorMessage: "Min. length of 50 characters. Has to start with a capital letter. You can use special characters: '@$!%*#?&.,-'"
  }
}

import { AbstractControl, Validator } from '@angular/forms';
import { RegexValidator } from '../../../../models/regex-validator.model';

export class RegexValidatorBase implements Validator {
  regExp: RegExp;
  regExValidatorName: string;
  errorMessage: string;

  constructor(
    regexValidator: RegexValidator
  ){
    this.regExp = regexValidator.regex;
    this.regExValidatorName = regexValidator.name.toString();
    this.errorMessage = regexValidator.errorMessage;
  }

  validate(control: AbstractControl): {[key: string]: any} | null {
    if (control.value != null) {
      if (this.regExp.test(control.value))
      {
        return null;
      }
    }
    return {errorMessage: {name: this.regExValidatorName, message: this.errorMessage}};
  }
}


export const validatorRegex = {
  noun: {
    regex: /^[A-Z][a-z]*$/,
    name: "nounValidator",
    errorMessage: "Start with a capital Letter!"
  },
  username: {
    regex: /^[A-Za-z\d@$!%*#?&]{5,255}$/,
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
    regex: /^[A-Za-z\d]{1,}$/,
    name: "houseNumberValidator",
    errorMessage: "At least one character!"
  },
  email: {
    regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    name: "emailValidator",
    errorMessage: "Not a valid Email-Address!"
  },
  password: {
    regex: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{7,}$/,
    name: "passwordValidator",
    errorMessage: "Min. 7 characters, at least 1 capital letter, 1 lowercase letter, 1 number and 1 special character: @$!%*#?&"
  },
  usernameOrEmail: {
    regex: /^((([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))|[A-Za-z\d@$!%*#?&]{5,})$/,
    name: "usernameOrEmailValidator",
    errorMessage: "You either need to enter your username or your email address."
  },
  title: {
    regex: /^[A-Z]([A-Za-z\d@$!%*#?&, ]){4,30}$/,
    name: "titleValidatdor",
    errorMessage: "Max. length of 30 and min. length of 5 and characters. You can use special characters: '@$!%*#?&'"
  },
  description: {
    regex: /^[A-Z]([A-Za-z\d@$!%*#?&,.\- ]){50,}$/,
    name: "descriptionValidatdor",
    errorMessage: "Min. length of 50 characters. Has to start with a capital letter. You can use special characters: '@$!%*#?&.,-'"
  },
  price: {
    regex: /^\d*([.]\d{1,})?$/,
    name: "priceValidator",
    errorMessage: "You can either enter an Integer or a Float."
  },
  location: {
    regex: /^[A-Za-z\d,\-., ]{1,}$/,
    name: "locationValidator",
    errorMessage: "You can either enter an Integer or a Float."
  },
  date: {
    regex: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|(1|2)[0-9]|3[0-1])T(0[1-9]|1[0-9]|2[0-3]):(0[0-9]|([1-5])[0-9])$/,
    name: "dateValidator",
    errorMessage: "Date and Time: yyyy-mm-ddThh:minmin"
  },
  rejectionMessage: {
    regex: /^[A-Z]([A-Za-z\d@$!%*#?&,.\- ]){50,}$/,
    name: "rejectionMessageValidator",
    errorMessage: "Min. length of 50 characters. Has to start with a capital letter. You can use special characters: '@$!%*#?&.,-'"
  }
}

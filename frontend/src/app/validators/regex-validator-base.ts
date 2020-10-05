import { AbstractControl } from '@angular/forms';
import { RegexValidator } from '../models/regex-validator.model.ts';

export class RegexValidatorBase {

  constructor(
    private regexValidator: RegexValidator
  ){
    this.regExp = regexValidator.regex;
    this.regExValidatorName = regexValidator.name.toString();
    this.errorMessage = regexValidator.errorMessage;
  }

  validate(control: AbstractControl): {[key: string]: any} | null {
    if (control.value != null) {
      if (this.regExp.test(control.value)) return null;
    }
    return {[this.regExValidatorName]: {valid: this.errorMessage}};
  }
}


export var validatorRegex = {
  gender: {
    regex: /^Female|Male|Other$/,
    name: "genderValidator",
    errorMessage: "You can choose between Female, Male or Other!"
  },
  noun: {
    regex: /^[A-Z][a-z]*$/,
    name: "nounValidator",
    errorMessage: "Has to start with a capital Letter!"
  },
  username: {
    regex: /^[A-Za-z\d@$!%*#?&]{5,}$/,
    name: "usernameValidator",
    errorMessage: "Min. length of 5 characters including the alphabet, numbers and special characters: @$!%*#?&"
  },
  phonenumber: {
    regex: /^(?=.{9,15})(([+]\d+ ){0,1}|0)[\d ]*$/,
    name: "phonenumberValidator",
    errorMessage: "Min. length of 9 numbers and max. length of 15 numbers."
  },
  plz: {
    regex: /^\d{3,10}$/,
    name: "plzValidator",
    errorMessage: "Has to be inbetween three and ten numbers!"
  },
  houseNumber: {
    regex: /^[A-Za-z\d]{1,}$/,
    name: "houseNumberValidator",
    errorMessage: "Has to be at least one characters!"
  },
  email: {
    regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    name: "emailValidator",
    errorMessage: "The email is not acceptable as an email!"
  },
  password: {
    regex: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{7,}$/,
    name: "passwordValidator",
    errorMessage: "The password needs to have min. 7 characters, at least one capital letter, at least one lowercase letter, at least one number and at least one special character: @$!%*#?&"
  },
  usernameOrEmail: {
    regex: /^((([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))|[A-Za-z\d@$!%*#?&]{5,})$/,
    name: "usernameOrEmailValidator",
    errorMessage: "You either need to enter your username or your email address."
  }
}

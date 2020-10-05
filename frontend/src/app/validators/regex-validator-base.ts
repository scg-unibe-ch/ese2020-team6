import { AbstractControl, Validator } from '@angular/forms';
import { RegexValidator } from '../models/regex-validator.model';

export class RegexValidatorBase implements Validator {
  regExp: RegExp;
  regExValidatorName: string;
  errorMessage: string;

  constructor(
    private regexValidator: RegexValidator
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


export let validatorRegex = {
  gender: {
    regex: /^Female|Male|Other$/,
    name: "genderValidator",
    errorMessage: "Choose between Female, Male or Other!"
  },
  noun: {
    regex: /^[A-Z][a-z]*$/,
    name: "nounValidator",
    errorMessage: "Start with a capital Letter!"
  },
  username: {
    regex: /^[A-Za-z\d@$!%*#?&]{5,}$/,
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
  }
}

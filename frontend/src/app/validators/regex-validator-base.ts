import { AbstractControl } from '@angular/forms';

export class RegexValidatorBase {

  constructor(
    private regExp: RegExp,
    private regExValidatorName: String
  ){ }

  validate(control: AbstractControl): {[key: string]: any} | null {
    if (control.value != null) {
      if (this.regExp.test(control.value)) return null;
    }
    return {[this.regExValidatorName.toString()]: {valid: false}};
  }
}


export var validatorRegex = {
  gender: {
    regex: /^Female|Male|Other$/,
    name: "genderValidator"
  },
  noun: {
    regex: /^[A-Z][a-z]*$/,
    name: "nounValidator"
  },
  phonenumber: {
    regex: /^(?=.{9,15})(([+]\d+ ){0,1}|0)[\d ]*$/,
    name: "phonenumberValidator"
  },
  plz: {
    regex: /^\d{3,10}$/,
    name: "plzValidator"
  },
  houseNumber: {
    regex: /^[A-Za-z\d]{1,}$/,
    name: "houseNumberValidator"
  },
  email: {
    regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    name: "emailValidator"
  },
  password: {
    regex: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{7,}$/,
    name: "passwordValidator"
  },

}

import { AbstractControl, Validator, ValidationErrors } from '@angular/forms';
import { RegexValidatorModel } from '../../../../models/custom-form/regex-validator.model';
import { Operator, operators } from './operator';
import { Constraint, Constraints, constraints } from './constraint';

export class RegexValidatorBase implements Validator {
  regExValidatorName: string;
  private onChange: () => void = () => {};

  constructor(
    protected regexValidator: RegexValidatorModel
  ){
    this.regExValidatorName = regexValidator.name.toString();
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (control.value != null) {
      let constraints = this.regexValidator.constraints;
      let errorMessages = new Array<string>();

      let testResults = Constraints.recursiveTestResults(constraints, control.value);

      if (!testResults) return null;
      else return {
        [this.regExValidatorName]: {
          errorName: "ErrorName",
          errorMessages: testResults
        }
      };
    }
    return {
      [this.regExValidatorName]: {
        errorName: "ErrorName",
        errorMessages: ['Must contain a value!']
      }
    };
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onChange = fn;
  }
}


export const validatorRegex = {
  noun: {
    name: "nounValidator",
    constraints: { and : [
      constraints.startWithCapLetter,
      constraints.wordUmlaut,
      constraints.minLength(1)
    ]}
  },
  username: {
    name: "usernameValidator",
    constraints: { and : [
      constraints.wordUmlautDot,
      constraints.noDoubleDot,
      constraints.noDotAtEnd,
      constraints.minLength(5),
      constraints.maxLength(30)
    ]}
  },
  phonenumber: {
    name: "phonenumberValidator",
    constraints: { and : [
      constraints.numbers,
      constraints.minLength(9),
      constraints.maxLength(15)
    ]}
  },
  plz: {
    name: "plzValidator",
    constraints: { and : [
      constraints.numbers,
      constraints.minLength(3),
      constraints.maxLength(10)
    ]}
  },
  houseNumber: {
    name: "houseNumberValidator",
    constraints: { and : [
      constraints.wordUmlautDot,
      constraints.minLength(1)
    ]}
  },
  email: {
    name: "emailValidator",
    constraints: { and: [
      {
        regExp: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z_äÄöÖüÜ\-0-9]+\.)+[a-zA-Z_äÄöÖüÜ]{2,}))$/,
        error: 'Enter you email.'
      }
    ]}
  },
  password: {
    name: "passwordValidator",
    constraints: { and : [
      constraints.oneNumber,
      constraints.oneCapLetter,
      constraints.oneLowLetter,
      constraints.oneSpecialCharacter,
      constraints.minLength(7)
    ]}
  },
  usernameOrEmail: {
    name: "usernameOrEmailValidator",
    constraints: { or : [
      {
        regExp: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z_äÄöÖüÜ\-0-9]+\.)+[a-zA-Z_äÄöÖüÜ]{2,}))$/,
        error: 'Enter you email'
      },
      { and : [
        constraints.wordUmlautDot,
        constraints.noDoubleDot,
        constraints.noDotAtEnd,
        constraints.minLength(5),
        constraints.maxLength(30)
      ]}
    ], error: 'Enter your email or username.'}
  },
  title: {
    name: "titleValidatdor",
    constraints: { and : [
      constraints.anyCharacter,
      constraints.startWithCapLetter,
      constraints.minLength(5)
    ]}
  },
  description: {
    name: "descriptionValidatdor",
    constraints: { and : [
      constraints.anyCharacter,
      constraints.startWithCapLetter,
      constraints.minLength(50)
    ]}
  },
  price: {
    name: "priceValidator",
    constraints: {and : [
      {
        regExp: /^\d{1,}([.]\d*)?$/,
        error: 'You can either enter an Integer or a Float.'
      },
      constraints.minLength(1)
    ]}
  },
  location: {
    name: "locationValidator",
    constraints: { and : [
      constraints.anyCharacter,
      constraints.minLength(1)
    ]}
  },
  date: {
    name: "dateValidator",
    constraints: { and : [
      {
        regExp: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|(1|2)[0-9]|3[0-1])T(0[0-9]|1[0-9]|2[0-3]):(0[0-9]|([1-5])[0-9])$/,
        error: 'Please choose a date.'
      }
    ]}
  },
  rejectionMessage: {
    name: "rejectionMessageValidator",
    constraints: { and : [
      constraints.startWithCapLetter,
      constraints.anyCharacter,
      constraints.minLength(50)
    ]}
  }
}

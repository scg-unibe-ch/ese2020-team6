import { AbstractControl } from '@angular/forms';
import { Operator, OperatorResult, operators } from './operator';

export interface Constraint {
  regExp: RegExp;
  error: string;
}


export class Constraints {
  anyCharacter: Constraint = {
    regExp: /^.*$/,
    error: '' //no error, because it can habe any character
  }
  oneNumber: Constraint = {
    regExp: /(?=\d)/,
    error: 'You have to use at least one number.'
  }
  oneCapLetter: Constraint = {
    regExp: /(?=[A-Z])/,
    error: 'You have to use at least one capital letter.'
  }
  oneLowLetter: Constraint = {
    regExp: /(?=[a-z])/,
    error: 'You have to use at least one lowercase letter.'
  }
  oneSpecialCharacter: Constraint = {
    regExp: /(?=[!@#$%^&(){}\[\]:;<>,.?~_+\\\/\-=|])/,
    error: 'You habe to use at leats one special character: !@#$%^&(){}[]:;<>,.?~_+-/\\=|'
  }
  startWithCapLetter: Constraint = {
    regExp: /^[A-ZÄÖÜ].*$/,
    error: 'You have to start with a capital letter.'
  }
  numbers: Constraint = {
    regExp: /^\d*$/,
    error: 'You can only enter numbers.'
  }
  noDoubleDot: Constraint = {
    regExp: /^(?!.*\.\.).*$/,
    error: 'You can not use two dots after one another.'
  }
  noDotAtEnd: Constraint = {
    regExp: /^(?!.*\.$).*$/,
    error: 'You can not use a dot at the end of the line.'
  }
  wordUmlaut: Constraint = {
    regExp: /^[\wäöüÄÖÜ]*$/,
    error: 'You can only use word characters: A-Z, a-z, 0-9, umlaute and "_".'
  }
  wordUmlautDot: Constraint = {
    regExp: /^[\wäöüÄÖÜ][\w.äöüÄÖÜ]*$/,
    error: 'You can only use word characters: A-Z, a-z, 0-9, umlaute, "_" and "." but no dot at the start.'
  }
  minLength: (minLength: number) => Constraint = (minLength: number): Constraint => {
    return {
      regExp: new RegExp('^.{' + minLength + ',}$'),
      error: 'You have to use at least ' + minLength + ' characters.'
    }
  }
  maxLength: (maxLength: number) => Constraint = (maxLength: number): Constraint => {
    return {
      regExp: new RegExp('^.{0,' + maxLength + '}$'),
      error: 'You can maximally enter ' + maxLength + ' characters'
    }
  }

  public static recursiveTest(constraints: Object, value: string): boolean {
    return this.recursiveTestResults(constraints, value) ? false : true;
  }



  public static recursiveTestResults(constraints: Object, value: string): Array<string> | null {
    let operatorInformation: Array<string> = Object.keys(constraints);
    this.checkConstraintValidatoion(operatorInformation);

    let operator: string = operatorInformation[0];
    let constraint: Array<Object> = constraints[operator];
    let testResults: Array<string> | null = this.executeTests(constraint, operator, value);

    if (this.isOverrideError(operatorInformation) && testResults) return [constraints['error']];
    return testResults;
  }

  private static checkConstraintValidatoion(operatorInformation: Array<string>): void {
    if (!this.isConstraintValid(operatorInformation)) throw 'Operator with signature ' + operatorInformation.toString() + ' is not valid!'
  }

  private static isConstraintValid(operatorInformation: Array<string>): boolean {
    let isValid: boolean = true;
    if (operatorInformation.length >= 1 && operatorInformation.length <= 2) {
      if (!(operatorInformation[0] === 'and' || operatorInformation[0] === 'or' || operatorInformation[0] === 'regExp')) isValid = false;
    } else isValid = false;

    if (operatorInformation.length == 2) {
      if (operatorInformation[1] !== 'error') isValid = false;
    }

    return isValid;
  }

  private static isOverrideError(operatorInformation: Array<string>): boolean {
    if (operatorInformation.length >= 2) {
        if (operatorInformation[1] === 'error') return true;
        else return false;
    } else return false;
  }

  private static executeTests(constraints: Array<Object>, operatorString: string, value: string): Array<string> | null {
    let testResults: Array<string> = new Array<string>();
    let operator: Operator = operators.EmptyOperator;

    switch (operatorString) {
      case 'and':
        operator = operators.ANDOperator;
        break;

      case 'or':
        operator = operators.OROperator;
        break;
    }
    testResults = this.switchOperator(constraints, operator, value);

    if (testResults) return testResults.length == 0 ? null : testResults;
    else return null;
  }


  private static switchOperator(constraints: Array<Object>, operator: Operator, value: string): Array<string> {
    let testResults: Array<string> = new Array<string>();
    let isValid: boolean = false;
    constraints.forEach((constraint: Constraint | Object) => {
      let operatorInformation: Array<string> = Object.keys(constraint);
      let testResult: Array<string> | null = this.switchTestMethod(constraint, operatorInformation, value);
      let operatorResult: OperatorResult = operator(testResults, testResult, isValid);
      testResults = operatorResult.results;
      isValid = operatorResult.isValid;
    });
    return testResults;
  }



  private static switchTestMethod(constraint: Constraint | Object, operatorInformation: Array<string>, value: string): Array<string> | null {
    this.checkConstraintValidatoion(operatorInformation);

    let testResult: Array<string> | string | null;
    switch (operatorInformation[0]) {
      case 'regExp':
        testResult = this.executeSingleTest(constraint, value);

        return testResult ? [testResult] : null;

      default:
        testResult = this.recursiveTestResults(constraint, value);

        return testResult ? testResult : null;
    }
  }

  private static executeSingleTest(tester: any, value: string): string | null {
    if (!tester.regExp.test(value)) return tester.error;
    else return null;
  }
}

export const constraints: Constraints = new Constraints();

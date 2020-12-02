export interface OperatorResult {
  results: Array<string>;
  isValid: boolean;
}
export type Operator = (testResults: Array<string>, testResult: Array<string> | null, isValid: boolean) => OperatorResult;

class Operators {
  private _ANDOperator: Operator = (testResults: Array<string>, testResult: Array<string> | null, isValid: boolean): OperatorResult => {
    if (testResult) {
      testResults = testResults.concat(testResult)
    }
    return {results: testResults, isValid: isValid};
  }

  private _OROperator: Operator = (testResults: Array<string>, testResult: Array<string> | null, isValid: boolean): OperatorResult => {
    if (!testResult && !isValid) {
      isValid = true;
      testResults = null;
    } else if (!isValid) {
      testResults = testResults.concat(testResult)
    }
    return {results: testResults, isValid: isValid};
  }

  private _EmptyOperator: Operator = (testResults: Array<string>, testResult: Array<string> | null, isValid: boolean): OperatorResult => {
    return {results: testResults, isValid: isValid};
  }

  get ANDOperator(): Operator {return this._ANDOperator}

  get OROperator(): Operator {return this._OROperator}

  get EmptyOperator(): Operator {return this._EmptyOperator}
}

export const operators: Operators = new Operators();

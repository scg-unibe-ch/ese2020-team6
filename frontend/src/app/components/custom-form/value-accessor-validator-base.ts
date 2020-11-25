import { Validator, NgModel } from '@angular/forms';
import { ValueAccessorBase } from './value-accessor-base';
import { validate, ValidatorArray, AsyncValidatorArray, ValidationResult } from './validate';
import { Observable, of } from 'rxjs';
import { map, reduce, share } from 'rxjs/operators';

export class ValueAccessorValidatorBase<T> extends ValueAccessorBase<T> implements Validator {

  protected model: NgModel;
  private _invalid: boolean = false;
  private _messages: Array<string> = new Array<string>();
  private _firstMessage: string = null;

  constructor(
    private validators: ValidatorArray,
    private asyncValidators: AsyncValidatorArray,
  ) {
    super();
  }

  /*
  Retreives the valitation results of all validators and asyncValidators.

  The results come back as a JSON object of validation results. Each element of the array
  is the result for one validator (sync or async). The results are in form of
  {
    [validatorName]: {
      errorName: string,
      errorMessages: Array<string>
    }
  }
  Each validator returns a set of messages, telling the user what is wrong with
  his input. Each message is used to check one specific part of the input.
  @SEE validators
  */
  public validate(): Observable<Object> {
    return validate(this.validators, this.asyncValidators)(this.model.control).pipe(share());
  }

  /*
  Creates an observable of booleans stating, if the input is valid or not.

  This can be determined by checking if there are any other values than null.
  If there is a null value, the input is valid, because all the validators
  returned null, which means all the validators are valid.
  */
  get isInvalidObservable(): Observable<boolean> {
    return this.model == null ? of(true) : this.validate().pipe(map((validationResults: Object) => {
      return Object.keys(validationResults || {}).length > 0
    }));
  }

  /*
  Retreives the boolean value if the input is invalid or not.
  */
  get invalid(): boolean {
    this.isInvalidObservable.subscribe((isInvalid: boolean) => {
      return this._invalid = isInvalid
    });
    return this._invalid;
  }

  /*
  Retreives the boolean value if the input is valid or not.
  */
  get valid(): boolean {
    return !this.invalid;
  }

  /*
  Extracts all the error-messages from the validation-results.

  Since each validation result has an array of error-messages and we do not care
  about the name of the error or the validators name, we simply extract all the
  arrays of error-messages and dump the other information. This leaves us with
  an Observable of an array of an array of strings. In detail:
  The inner array is an array of error-messages of ONE validator. The outer array
  seperates the different validators.
  */
  private extractMessages(): Observable<Array<Array<string>>> {
    if (this.model) {
      return this.validate().pipe(map((validationResults: Object) => {
        return Object.keys(validationResults).map(validatorName => {
          return validationResults[validatorName].errorMessages;
        });
      }));
    } else return of(new Array<Array<string>>());
  }

  /*
  Reduces all the error-messages to one array.

  Since we do not care about what message came from which validator, we now combine
  all the messages to one array.
  */
  private reduceMessages(): Observable<Array<string>> {
    let extractedMessagesObservable: Observable<Array<Array<string>>> = this.extractMessages();
    return extractedMessagesObservable.pipe(reduce((result: Array<string>, allMessages: Array<Array<string>>) => {
      this.pushAllMessagesToResult(result, allMessages);
      return result;
    },[]));
  }

  /*
  Combines all messages in each inner array of 'allMessages' to one array.

  We first loop through the outer array and then through the inner array. We then
  push every message of the inner array onto one sinle result array.
  */
  private pushAllMessagesToResult(result: Array<string>, allMessages: Array<Array<string>>): void {
    allMessages.forEach((singleMessages: Array<string>) => {
      singleMessages.forEach((message: string) => {
        result.push(message)
      });
    });
  }

  /*
  Extracts one error-message from all the different messages.

  This method returns an observable of one singe string. This is particularly
  useful when we only want to display one message and not all. This is because
  the space on the webpage should not be filled with error-messages. There can
  be many error-messages for one input and this method prevents overloading
  the page with messages.
  */
  private reduceToFirstMessage(): Observable<string> {
    let reducedMessagesObservable: Observable<Array<string>> = this.reduceMessages();
    return reducedMessagesObservable.pipe(map((messages: Array<string>) => {
      if (messages.length > 0) return messages[0];
      else return null;
    }))
  }

  /*
  Retreives all the error-messages from the reduced messages.
  */
  get allMessages(): Array<string> {
    let reducedMessagesObservable: Observable<Array<string>> = this.reduceMessages();
    reducedMessagesObservable.subscribe((messages: Array<string>) => this._messages = messages);

    return this._messages;
  }

  /*
  Retreives the first error-message of the reduced messages.
  */
  get firstMessage(): string {
    let firstMessageObservable: Observable<string> = this.reduceToFirstMessage();
    firstMessageObservable.subscribe((firstMessage: string) => this._firstMessage = firstMessage)

    return this._firstMessage;
  }

  /*
  Determies all the classes based on the current status of the input:

  If the input is:
    * touched -> 'touched'
    * not touched -> 'untouched'

    * dirty -> 'dirty'
    * not dirty -> 'pristine'

    * invalid -> 'invalid'
    * not invalid -> 'valid'

  Additionally to these classes, the theme class is also added to the classes.
  */
  get classes(): Array<string> {
    let classes: Array<string> = new Array<string>();
    classes.push(this.touched ? 'touched' : 'untouched');
    classes.push(this.dirty ? 'dirty' : 'pristine');
    classes.push(this.invalid ? 'invalid' : 'valid');
    return classes;
  }

}

import { Validator } from '@angular/forms';
import { ValueAccessorBase } from './value-accessor-base';
import { validate, ValidatorArray, AsyncValidatorArray, ValidationResult } from './validate';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ThemeService } from '../../services/theme/theme.service';

export class ValueAccessorValidatorBase<T> extends ValueAccessorBase<T> implements Validator {

  private _invalid: boolean = false;
  private _messages: Array<string> = new Array<string>();

  constructor(
    private validators: ValidatorArray,
    private asyncValidators: AsyncValidatorArray,
    themeService: ThemeService
  ) {
    super(themeService);
  }

  public validate(): Observable<ValidationResult> {
    return validate(this.validators, this.asyncValidators)(this.model.control);
  }

  get classes(): Array<string> {
    let classes: Array<string> = new Array<string>();
    classes.push(this.touched ? 'touched' : 'untouched');
    classes.push(this.dirty ? 'dirty' : 'pristine');
    classes.push(this.theme);
    classes.push(this.invalid ? 'invalid' : 'valid');
    return classes;
  }

  get isInvalidObservable(): Observable<boolean> {
    return this.model == null ? of(true) : this.validate().pipe(map(value => Object.keys(value || {}).length > 0));
  }

  get invalid(): boolean {
    this.isInvalidObservable.subscribe((isInvalid: boolean) => this._invalid = isInvalid);
    return this._invalid;
  }

  get messagesObservable(): Observable<Array<string>> {
    return this.model == null ? of(new Array<string>()) : this.validate().pipe(map((value: Object) => Object.keys(value).map(key => value[key].message)));
  }

  get messages(): Array<string> {
    this.messagesObservable.subscribe((messages: Array<string>) => this._messages = messages);
    return this._messages;
  }

}

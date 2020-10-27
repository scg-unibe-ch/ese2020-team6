import { NgModel, Validator } from '@angular/forms';
import { ValueAccessorBase } from './value-accessor-base';
import { validate, ValidatorArray, AsyncValidatorArray, ValidationResult } from './validate';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export class ValueAccessorValidatorBase<T> extends ValueAccessorBase<T> implements Validator {
  protected model: NgModel;

  constructor(
    private validators: ValidatorArray,
    private asyncValidators: AsyncValidatorArray
  ) {
    super();
  }

  public validate(): Observable<ValidationResult> {
    return validate(this.validators, this.asyncValidators)(this.model.control);
  }

  get invalid(): Observable<boolean> {
    return this.model == null ? of(true) : this.validate().pipe(map(value => Object.keys(value || {}).length > 0));
  }

  get messages(): Observable<Array<string>> {
    return this.validate().pipe(map((value: Object) => Object.keys(value).map(key => value[key].message)));
  }

}

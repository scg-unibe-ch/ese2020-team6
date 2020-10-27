import {ControlValueAccessor} from '@angular/forms';


export class ValueAccessorBase<T> implements ControlValueAccessor {
  private innerValue: T;


  private onChange: (value: T) => void = (value: T) => {};
  private onTouched: () => void = () => {};


  get value(): T {
    return this.innerValue;
  }


  set value(value: T) {
    this.writeValue(value);
    this.onChange(value);
  }


  touch() {
    this.onTouched();
  }


  writeValue(value: T) {
    if (this.innerValue !== value) {
      this.innerValue = value;
    }
  }


  registerOnChange(fn: (value: T) => void): void {
    this.onChange = fn;
  }


  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}

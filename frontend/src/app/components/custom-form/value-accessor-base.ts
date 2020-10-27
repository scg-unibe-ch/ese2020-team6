import {ControlValueAccessor} from '@angular/forms';


export class ValueAccessorBase<T> implements ControlValueAccessor {
  private innerValue: T;


  private changed = new Array<(value: T) => void>();
  private touched = new Array<() => void>();


  get value(): T {
    return this.innerValue;
  }


  set value(value: T) {
    if (this.innerValue !== value) {
      this.innerValue = value;
      this.changed.forEach(f => f(value));
    }
  }


  public touch() {
    this.touched.forEach(f => f());
  }


  public writeValue(value: T) {
    this.innerValue = value;
  }


  public registerOnChange(fn: (value: T) => void) {
    this.changed.push(fn);
  }


  public registerOnTouched(fn: () => void) {
    this.touched.push(fn);
  }
}

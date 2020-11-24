import {ControlValueAccessor} from '@angular/forms';


export class ValueAccessorBase<T> implements ControlValueAccessor {
  private _touched = false;
  private _dirty = false;
  private _focused = false;

  private innerValue: T;


  protected onChange: (value: T) => void = (value: T) => {};
  protected onTouched: () => void = () => {};
  

  get value(): T {
    return this.innerValue;
  }

  set value(value: T) {
    this.writeValue(value);
    this.dirty = true;
    this.onChange(value);
  }


  public touch(): void {
    this.touched = true;
    this.focused = false;
    this.onTouched();
  }

  public focus(): void {
    this.focused = true;
  }


  public writeValue(value: T): void {
    if (this.innerValue !== value && this.innerValue !== value) {
      this.innerValue = value;
    }
  }


  public registerOnChange(fn: (value: T) => void): void {
    this.onChange = fn;
  }


  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }



  get touched(): boolean {
    return this._touched;
  }

  set touched(isTouched: boolean) {
    this._touched = isTouched;
  }

  get dirty(): boolean {
    return this._dirty;
  }

  set dirty(isDirty: boolean) {
    this._dirty = isDirty;
  }

  get focused(): boolean {
    return this._focused;
  }

  set focused(isFocused: boolean) {
    this._focused = isFocused;
  }

  get classes(): Array<string> {
    let classes: Array<string> = new Array<string>();
    classes.push(this.touched ? 'touched' : 'untouched');
    classes.push(this.dirty ? 'dirty' : 'pristine');

    return classes;
  }
}

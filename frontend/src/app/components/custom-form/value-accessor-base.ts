import {ControlValueAccessor, NgModel} from '@angular/forms';
import { Themable } from '../../models/theme/themable';
import { ThemeService } from '../../services/theme/theme.service';


export class ValueAccessorBase<T> extends Themable implements ControlValueAccessor {
  protected model: NgModel;

  private _touched: boolean = false;
  private _dirty: boolean = false;
  private _focused: boolean = false;

  protected innerValue: T;


  private onChange: (value: T) => void = (value: T) => {};
  private onTouched: () => void = () => {};

  constructor(
    themeService: ThemeService
  ) {
    super(themeService);
  }


  get value(): T {
    return this.innerValue;
  }

  set value(value: T) {
    this.writeValue(value);
    this.dirty = true;
    this.onChange(value);
  }


  touch() {
    this.touched = true;
    this.focused = false;
    this.onTouched();
  }

  focus() {
    this.focused = true;
  }


  writeValue(value: T) {
    if (this.innerValue != value && this.innerValue !== value) {
      this.innerValue = value;
    }
  }


  registerOnChange(fn: (value: T) => void): void {
    this.onChange = fn;
  }


  registerOnTouched(fn: () => void): void {
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
    classes.push(this.theme);

    return classes;
  }
}

import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR} from '@angular/forms';
import { ValueAccessorBase } from '../../value-accessor-base';
import { ThemeService } from '../../../../services/theme/theme.service';

@Component({
  selector: 'select-multiple',
  templateUrl: './select-multiple.component.html',
  styleUrls: ['./select-multiple.component.scss'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: SelectMultipleComponent, multi: true}
  ]
})
export class SelectMultipleComponent extends ValueAccessorBase<Array<string>> {

  @Input()
  public placeholder: string;

  @Input()
  public selectName: string;

  private _options: Array<string> = new Array<string>();
  @Input()
  set options(options: Array<string>) {
    this._options = options;
    this.availableOptions = Object.assign([], options);
    this.availableOptions.forEach((option: string) => {
      if (this.selectedOptions.includes(option)) this.remove(this.availableOptions, option);
    });
    this.selectedOptions.forEach((option: string) => {
      if (!options.includes(option)) this.remove(this.selectedOptions, option);
    });
  }


  public selectedOptions: Array<string> = new Array<string>();
  public availableOptions: Array<string> = new Array<string>();

  public optionsHidden: Boolean = true;

  constructor(
    themeService: ThemeService
  ) {
    super(themeService);
  }

  public onToggleDropdown(): void {
    this.optionsHidden = !this.optionsHidden;
  }

  public onSelect(option: string): void {
    if (!this.selectedOptions.includes(option)) {
      this.selectedOptions.push(option);
      this.remove(this.availableOptions, option);
    }
    this.setSelectedOptions();
  }

  public onDeselect(option: string): void {
    if (this.selectedOptions.includes(option)) {
      this.availableOptions.push(option);
      this.remove(this.selectedOptions, option);
    }
    this.setSelectedOptions();
  }

  private setSelectedOptions(): void {
    this.value = this.selectedOptions;
    this.onToggleDropdown();
  }

  public writeValue(value: Array<string>) {
    super.writeValue(value);
    if (value) {
      this.dirty = true;
      value.forEach((option: string) => {
        if (!this.selectedOptions.includes(option)) {
          this.selectedOptions.push(option);
          this.remove(this.availableOptions, option);
        }
      });
    }
  }

  protected remove(array: Array<string>, option: string): Array<string> {
    let indexOfOption: number = array.indexOf(option);
    if (indexOfOption >= 0) {
      array.splice(indexOfOption, 1);
    }
    return array;
  }

  get SVGClass(): string {
    return this.optionsHidden ? 'down' : 'up';
  }

  get showSelectName(): boolean {
    if (!this.value) return true;
    else {
      if (this.value.length == 0) return true;
    }
    return false;
  }

}

import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR} from '@angular/forms';
import { ValueAccessorBase } from '../value-accessor-base';
import { ThemeService } from '../../../services/theme/theme.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: SelectComponent, multi: true}
  ]
})
export class SelectComponent extends ValueAccessorBase<String> {

  @Input()
  public placeholder: String;

  @Input()
  public selectName: String;

  @Input()
  public options: Array<String> = new Array<String>();

  public optionsHidden: Boolean = true;

  constructor(
    themeService: ThemeService
  ) {
    super(themeService);
  }

  public onToggleDropdown() {
    this.optionsHidden = !this.optionsHidden;
  }

  public onSelect(option: string) {
    this.value = option;
    this.onToggleDropdown();
  }

  public writeValue(value: string) {
    super.writeValue(value);
    if (value) {
      this.dirty = true;
    }
  }

  get SVGClass(): string {
    return this.optionsHidden ? 'down' : 'up';
  }

}

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
  placeholder: String;

  @Input()
  selectName: String;

  @Input()
  options: Array<String> = new Array<String>();

  public optionsHidden: Boolean = true;

  constructor(
    themeService: ThemeService
  ) {
    super(themeService);
  }

  onToggleDropdown() {
    this.optionsHidden = !this.optionsHidden;
  }

  onSelect(option: string) {
    this.value = option;
    this.onToggleDropdown();
  }

  get SVGClass(): string {
    return this.optionsHidden ? 'down' : 'up';
  }

}

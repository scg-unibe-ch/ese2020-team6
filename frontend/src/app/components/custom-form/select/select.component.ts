import { Component, Input, OnInit } from '@angular/core';
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
export class SelectComponent extends ValueAccessorBase<String> implements OnInit {

  @Input()
  placeholder: String;

  @Input()
  selectName: String;

  @Input()
  options: Array<String> = new Array<String>();

  public optionsHidden: Boolean = true;
  public current: String;
  private isDefault: boolean;

  constructor(
    themeService: ThemeService
  ) {
    super(themeService);
  }

  ngOnInit(): void {
    this.current = this.selectName;
    this.isDefault = true;
  }

  onToggleDropdown() {
    this.optionsHidden = !this.optionsHidden;
  }

  onSelect(option: string) {
    this.value = option;
    this.current = option;
    this.isDefault = false;
    this.touch();
    this.onToggleDropdown();
  }

  get SVGClass(): string {
    return this.optionsHidden ? 'down' : 'up';
  }

}

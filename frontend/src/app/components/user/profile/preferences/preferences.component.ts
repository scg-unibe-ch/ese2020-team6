import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../../../services/theme/theme.service';
import { Themable } from '../../../../models/theme/themable';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent extends Themable {

  constructor(
    themeService: ThemeService
  ) {
    super(themeService);
  }

  public switchTheme(): void {
    this.themeService.switchTheme();
  }

  get isChecked(): string {
    return this.themeService.currentTheme === 'dark' ? 'checked' : '';
  }

}

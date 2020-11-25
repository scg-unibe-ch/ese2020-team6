import { Component } from '@angular/core';
import { ThemeService } from '../../../../services/theme/theme.service';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent {

  constructor(
    private themeService: ThemeService
  ) {
  }

  public switchTheme(): void {
    this.themeService.switchTheme();
  }

  get isChecked(): string {
    return this.themeService.currentTheme === 'dark' ? 'checked' : '';
  }

}

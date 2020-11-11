import { Injectable } from '@angular/core';
import { Themable } from '../../models/theme/themable';
import { PreferenceModel, NullPreference } from '../../models/user/preference/preference.model';
import { PreferenceService } from '../user/preference/preference.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private availableThemeStrings: Array<string> = [
    'bright',
    'dark'
  ];

  private initialTheme: number = 0;
  private _currentTheme: number;
  private preference: PreferenceModel = new NullPreference();

  private themables: Array<Themable>;

  constructor(
    private preferenceService: PreferenceService
  ) {
    this.themables = new Array<Themable>();
    this.load();
  }

  public addThemable(themable: Themable): void {
    this.themables.push(themable);
  }

  public switchTheme(): ThemeService {
    this._currentTheme = (this._currentTheme + 1) % this.availableThemeStrings.length;
    this.preference.theme = this.currentTheme;
    this.preferenceService.setPreferences(this.preference).onUpdate(()=>{});
    this.notifyThemables();
    this.save();
    return this;
  }

  private notifyThemables(): void {
    this.themables.forEach((themable: Themable) => {
      themable.changeTheme();
    });
  }

  private load(): void {
    this._currentTheme = this.initialTheme;
    let locatStorageTheme = localStorage.getItem('theme');

    if (locatStorageTheme) {
      try {
        this._currentTheme = parseInt(locatStorageTheme, 10);
        this.save();
        return;
      } catch (error) {};
    } else {
      this.preferenceService.onLoad((preference: PreferenceModel) => {
        this._currentTheme = this.getIndexFromThemeName(preference.theme);
        this.preference = preference;
        this.notifyThemables();
        this.save();
      });
      return;
    }
  }

  private save(): void {
    localStorage.setItem('theme', this._currentTheme.toString());
  }

  private getIndexFromThemeName(theme: string): number {
    return this.availableThemeStrings.indexOf(theme);
  }

  get currentTheme(): string {
    return this.availableThemeStrings[this._currentTheme];
  }
}

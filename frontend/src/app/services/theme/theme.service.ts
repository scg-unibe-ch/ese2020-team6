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
    this.preferenceService.onEvent('onUpdate',()=>{});
  }

  public addThemable(themable: Themable): void {
    this.themables.push(themable);
  }

  public switchTheme(): ThemeService {
    this._currentTheme = (this._currentTheme + 1) % this.availableThemeStrings.length;
    this.preference.theme = this.currentTheme;
    this.preferenceService.update(this.preference);
    this.notifyThemables();
    this.saveToLocalStorage();
    return this;
  }

  private notifyThemables(): void {
    this.themables.forEach((themable: Themable) => {
      themable.changeTheme();
    });
  }

  private load(): void {
    try {
      this.loadFromLocalStorage();
    } catch (error) {
      this.loadFromService();
    }
  }

  private loadFromLocalStorage(): void | Error {
      let locatStorageTheme = localStorage.getItem('theme');
      let currentThemeTemp: number = parseInt(locatStorageTheme, 10);
      if (isNaN(currentThemeTemp)) throw new Error("Theme is not set correctly!");
      this._currentTheme = currentThemeTemp;
      this.saveToLocalStorage();
  }

  private loadFromService(): void {
    this._currentTheme = this.initialTheme;
    this.preferenceService.onEvent('onLoad', (preference: PreferenceModel) => {
      this.preference = preference;
      this._currentTheme = this.getIndexFromThemeName(preference.theme);
      this.notifyThemables();
      this.saveToLocalStorage();
    });
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('theme', this._currentTheme.toString());
  }

  private getIndexFromThemeName(theme: string): number {
    return this.availableThemeStrings.indexOf(theme);
  }

  get currentTheme(): string {
    return this.availableThemeStrings[this._currentTheme];
  }
}

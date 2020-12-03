import { Injectable } from '@angular/core';
import { ThemeObserver } from '../../models/theme/themable';
import { PreferenceModel, NullPreference } from '../../models/user/preference/preference.model';
import { PreferenceService } from '../user/preference/preference.service';
import { UserService } from '../user/user.service';
import { SuccessLoader } from '../service.module';

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
  private _previousTheme: number;
  private preference: PreferenceModel = new NullPreference();

  private themeObservers: Array<ThemeObserver>;

  private preferenceLoader = new SuccessLoader((prerefence: PreferenceModel) => {
    this.preference = prerefence;
    this.setTheme(this.getIndexFromThemeName(prerefence.theme));
  });

  constructor(
    private preferenceService: PreferenceService,
    private userService: UserService
  ) {
    this._currentTheme = this.initialTheme;
    this._previousTheme = this.initialTheme;
    this.themeObservers = new Array<ThemeObserver>();
    this.laod();
  }

  public addThemeObserver(themeObserver: ThemeObserver): void {
    this.themeObservers.push(themeObserver);
    this.notifyThemeObserver(themeObserver);
  }

  public switchTheme(): ThemeService {
    this.setTheme((this._currentTheme + 1) % this.availableThemeStrings.length);
    this.preference.theme = this.currentTheme;
    this.preferenceService.update(this.preference);
    return this;
  }

  private notifyThemeObservers(): void {
    this.themeObservers.forEach((themeObserver: ThemeObserver) => {
      this.notifyThemeObserver(themeObserver);
    });
  }

  private notifyThemeObserver(themeObserver: ThemeObserver): void {
    themeObserver.onThemeChange(this.currentTheme, this.previousTheme);
  }

  private laod(): void | Error {
    try {
      let locatStorageTheme = localStorage.getItem('theme');
      let currentThemeTemp: number = parseInt(locatStorageTheme, 10);
      if (isNaN(currentThemeTemp)) throw new Error("Theme is not set correctly!");
      this.setTheme(currentThemeTemp);
    } catch (error) {
      this.preferenceService.subscribe(this.preferenceLoader);
    }
  }

  private setTheme(theme: number) {
    this._previousTheme = this._currentTheme;
    this._currentTheme = theme;
    this.preference.theme = this.currentTheme;
    this.saveToLocalStorage();
    this.notifyThemeObservers();
    this.notifyThemeObservers();
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

  get previousTheme(): string {
    return this.availableThemeStrings[this._previousTheme];
  }
}

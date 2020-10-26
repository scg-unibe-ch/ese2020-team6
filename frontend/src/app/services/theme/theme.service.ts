import { Injectable } from '@angular/core';
import { Themable } from '../../models/theme/themable';

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

  private themables: Array<Themable>;

  constructor() {
    this.themables = new Array<Themable>();
    this.load();
  }

  public addThemable(themable: Themable): void {
    this.themables.push(themable);
  }

  public switchTheme(): ThemeService {
    this._currentTheme = (this._currentTheme + 1) % this.availableThemeStrings.length;
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
    let locatStorageTheme = localStorage.getItem('theme');

    if (locatStorageTheme) {
      try {
        this._currentTheme = parseInt(locatStorageTheme, 10);
        return;
      } catch (error) {};
    }
    this._currentTheme = this.initialTheme;
    this.save();
  }

  private save(): void {
    localStorage.setItem('theme', this._currentTheme.toString());
  }

  get currentTheme(): string {
    return this.availableThemeStrings[this._currentTheme];
  }
}

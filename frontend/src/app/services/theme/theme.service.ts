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
    this._currentTheme = this.initialTheme;
    this.themables = new Array<Themable>();
  }

  public addThemable(themable: Themable): void {
    this.themables.push(themable);
  }

  public switchTheme(): ThemeService {
    this._currentTheme = (this._currentTheme + 1) % this.availableThemeStrings.length;
    this.notifyThemables();
    return this;
  }

  private notifyThemables(): void {
    this.themables.forEach((themable: Themable) => {
      themable.changeTheme();
    });
  }

  get currentTheme(): string {
    return this.availableThemeStrings[this._currentTheme];
  }
}

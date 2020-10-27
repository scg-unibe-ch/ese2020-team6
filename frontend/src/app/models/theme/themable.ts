import { ThemeService } from '../../services/theme/theme.service';

export class Themable {
  public theme: string;

  constructor(
    protected themeService: ThemeService
  ) {
    themeService.addThemable(this);
    this.theme = themeService.currentTheme;
  }

  public changeTheme(): void {
    this.theme = this.themeService.currentTheme;
  }
}

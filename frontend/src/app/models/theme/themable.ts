import { ThemeService } from '../../services/theme/theme.service';

export interface ThemeObserver {
  onThemeChange(currentTheme: string, previousTheme?: string): void;
}

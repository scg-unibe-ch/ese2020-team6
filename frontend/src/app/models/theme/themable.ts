export interface ThemeObserver {
  onThemeChange(currentTheme: string, previousTheme?: string): void;
}

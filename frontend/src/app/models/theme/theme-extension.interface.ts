export abstract class ThemeExtension {
  get extension(): string {
    return this.buildExtension();
  }

  protected abstract buildExtension(): string;
}

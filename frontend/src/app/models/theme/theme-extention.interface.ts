export abstract class ThemeExtention {
  get extention(): string {
    return this.buildExtention();
  }

  protected abstract buildExtention(): string;
}

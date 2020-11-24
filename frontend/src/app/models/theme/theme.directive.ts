import { Directive, ElementRef, Input, HostBinding, Optional, Self, OnChanges } from '@angular/core';
import { ThemeService } from '../../services/theme/theme.service';
import { ThemeObserver } from './themable';
import { ButtonDirective } from './button/button.directive';
import { ButtonEmptyDirective } from './button/button-empty.directive';
import { ButtonWarnDirective } from './button/button-warn.directive';

@Directive({
  selector: '[theme]'
})
export class ThemeDirective implements ThemeObserver, OnChanges{

  private classes: Array<string> = new Array<string>();
  private currentTheme: string;
  private previousTheme: string;

  @Input('class')
  @HostBinding('class')
  get class(): string {
    return this.classes.join(' ');
  }
  set class(classes: string) {
    this.classes = classes.split(' ');
  }

  @Input()
  private defaultBaseClassExtensions: Array<string> = new Array<string>();
  private otherBaseClassExtensions: Array<string> = new Array<string>();
  private allPreviousExtendedBaseClassExtensions: Array<string> = new Array<string>();

  constructor(
    private themeService: ThemeService,
    @Optional() @Self() private button: ButtonDirective,
    @Optional() @Self() private buttonEmpty: ButtonEmptyDirective,
    @Optional() @Self() private buttonWarn: ButtonWarnDirective
  ) {
    this.themeService.addThemeObserver(this);
  }

  public ngOnChanges(): void {
    this.applyThemeClass(this.currentTheme, this.previousTheme);
    this.applyClassExtensions(this.currentTheme, this.previousTheme);
  }

  public onThemeChange(currentTheme: string, previousTheme: string): void {
    this.currentTheme = currentTheme;
    this.previousTheme = previousTheme;
    this.ngOnChanges();
  }


  private applyThemeClass(currentTheme: string, previousTheme: string): void {
    this.removeClass(previousTheme)
    this.addClass(currentTheme);
  }

  private applyClassExtensions(currentTheme: string, previousTheme: string): void {
    this.removeClassExtensions(previousTheme);
    this.buildOtherBaseClassExtensions();
    this.addClassExtensions(currentTheme);
  }



  /*******************************
    Building Class Extensions
  *******************************/

  private buildOtherBaseClassExtensions(): void {
    if (this.button) this.otherBaseClassExtensions.push(this.button.extension);
    if (this.buttonEmpty) this.otherBaseClassExtensions.push(this.buttonEmpty.extension);
    if (this.buttonWarn) this.otherBaseClassExtensions.push(this.buttonWarn.extension);
    if (this.button && this.buttonEmpty ||
        this.button && this.buttonWarn ||
        this.buttonWarn && this.buttonEmpty) throw 'You cannot assing "button" and "buttonEmpty", only one!';
  }
  private buildClassExtensions(theme: string, baseClassExtensions: Array<string>): Array<string> {
    return baseClassExtensions.map((singleClass: string) => this.buildClassExtension(theme, singleClass))
  }
  private buildClassExtension(theme: string, singleClass: string): string {
    return singleClass + '-' + theme;
  }

  /*******************************
    Adding and Removing classes
  *******************************/

  private addClass(singleClass: string): void {
    if (!this.classes.includes(singleClass)) this.classes.push(singleClass);
  }

  private addClasses(classes: Array<string>): void {
    classes.forEach((singleClass: string) => {
      this.addClass(singleClass);
    });
  }

  private addClassExtensions(theme: string): void {
    let allExtendedBaseClassExtensions = this.buildClassExtensions(theme, this.defaultBaseClassExtensions.concat(this.otherBaseClassExtensions));
    this.addClasses(allExtendedBaseClassExtensions);
    this.allPreviousExtendedBaseClassExtensions = allExtendedBaseClassExtensions;
  }

  private removeClass(singleClass: string): void {
    let index: number = this.classes.indexOf(singleClass);
    if (index > -1) {
      this.classes.splice(index, 1);
    }
  }

  private removeClasses(classes: Array<string>): void {
    classes.forEach((singleClass: string) => {
      this.removeClass(singleClass);
    });
  }

  private removeClassExtensions(theme: string): void {
    this.removeClasses(this.allPreviousExtendedBaseClassExtensions);
  }

}

import { Directive, ElementRef, Input, HostBinding, Optional, Self, OnChanges } from '@angular/core';
import { ThemeService } from '../../services/theme/theme.service';
import { Themable } from './themable';
import { ButtonDirective } from './button/button.directive';
import { ButtonEmptyDirective } from './button/button-empty.directive';
import { ButtonWarnDirective } from './button/button-warn.directive';

@Directive({
  selector: '[theme]'
})
export class ThemeDirective extends Themable implements OnChanges {

  private classes: Array<string> = new Array<string>();

  @Input('class')
  @HostBinding('class')
  get class(): string {
    return this.classes.join(' ');
  }
  set class(classes: string) {
    this.classes = classes.split(' ');
  }

  @Input()
  public classExtentions: Array<string> = new Array<string>();
  private baseExtentions: Array<string> = new Array<string>();

  constructor(
    themeService: ThemeService,
    @Optional() @Self() private button: ButtonDirective,
    @Optional() @Self() private buttonEmpty: ButtonEmptyDirective,
    @Optional() @Self() private buttonWarn: ButtonWarnDirective
  ) {
    super(themeService);
    this.applyThemeClass();
    this.applyClassExtentions();
  }

  public ngOnChanges(): void {
    this.applyThemeClass();
    this.applyClassExtentions();
  }

  private applyThemeClass(): void {
    this.pushClass(this.theme);
  }

  private removeClassExtentions(): void {
    this.baseExtentions.forEach((singleClass: string) => {
      let index: number = this.classes.indexOf(this.buildClassExtention(singleClass));
      if (index > -1) {
        this.classes.splice(index, 1);
      }
    });
  }

  private applyClassExtentions(): void {
    this.removeClassExtentions();
    this.pushClasses(this.buildClassExtentions());
    this.baseExtentions = Object.assign([], this.classExtentions);
  }

  private buildClassExtentions(): Array<string> {
    if (this.button) this.classExtentions.push(this.button.extention);
    if (this.buttonEmpty) this.classExtentions.push(this.buttonEmpty.extention);
    if (this.buttonWarn) this.classExtentions.push(this.buttonWarn.extention);
    if (this.button && this.buttonEmpty ||
        this.button && this.buttonWarn ||
        this.buttonWarn && this.buttonEmpty) throw 'You cannot assing "button" and "buttonEmpty", only one!';
    return this.classExtentions.map((singleClass: string) => this.buildClassExtention(singleClass));
  }

  private buildClassExtention(singleClass: string): string {
    return singleClass + '-' + this.theme;
  }

  private pushClass(singleClass: string): void {
    if (this.classes.indexOf(singleClass) == -1) this.classes.push(singleClass);
  }

  private pushClasses(classes: Array<string>): void {
    classes.forEach((singleClass: string) => {
      this.pushClass(singleClass);
    });
  }

}

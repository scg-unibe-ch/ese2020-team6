import { Directive, ElementRef, Input, HostBinding, Optional, Self, OnChanges } from '@angular/core';
import { ThemeService } from '../../services/theme/theme.service';
import { Themable } from './themable';
import { ButtonDirective } from './button/button.directive';
import { ButtonEmptyDirective } from './button/button-empty.directive';

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

  constructor(
    themeService: ThemeService,
    @Optional() @Self() private button: ButtonDirective,
    @Optional() @Self() private buttonEmpty: ButtonEmptyDirective
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

  private applyClassExtentions(): void {
    this.pushClasses(this.buildClassExtentions());
  }

  private buildClassExtentions(): Array<string> {
    if (this.button) this.classExtentions.push(this.button.extention);
    if (this.buttonEmpty) this.classExtentions.push(this.buttonEmpty.extention);
    if (this.button && this.buttonEmpty) throw 'You cannot assing "button" and "buttonEmpty", only one!';
    return this.classExtentions.map((singleClass: string) => singleClass + '-' + this.theme);
  }

  private pushClass(singleClass: string): void {
    this.classes.push(singleClass);
  }

  private pushClasses(classes: Array<string>): void {
    this.classes = this.classes.concat(classes);
  }

}

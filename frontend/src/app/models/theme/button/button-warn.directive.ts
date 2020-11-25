import { Directive } from '@angular/core';
import { ThemeExtension } from '../theme-extension.interface';

@Directive({
  selector: '[buttonWarn]'
})
export class ButtonWarnDirective extends ThemeExtension {

  protected buildExtension(): string {
    return 'button-warn';
  }

}

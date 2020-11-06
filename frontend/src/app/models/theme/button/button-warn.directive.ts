import { Directive } from '@angular/core';
import { ThemeExtention } from '../theme-extention.interface';

@Directive({
  selector: '[buttonWarn]'
})
export class ButtonWarnDirective extends ThemeExtention {

  protected buildExtention(): string {
    return 'button-warn';
  }

}

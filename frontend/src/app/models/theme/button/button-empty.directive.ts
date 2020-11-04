import { Directive } from '@angular/core';
import { ThemeExtention } from '../theme-extention.interface';

@Directive({
  selector: '[buttonEmpty]'
})
export class ButtonEmptyDirective extends ThemeExtention {

  protected buildExtention(): string {
    return 'button-empty';
  }

}

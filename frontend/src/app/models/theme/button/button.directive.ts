import { Directive } from '@angular/core';
import { ThemeExtention } from '../theme-extention.interface';

@Directive({
  selector: '[button]'
})
export class ButtonDirective extends ThemeExtention {

  protected buildExtention(): string {
    return 'button';
  }

}

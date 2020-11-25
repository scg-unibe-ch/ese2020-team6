import { Directive } from '@angular/core';
import { ThemeExtension } from '../theme-extension.interface';

@Directive({
  selector: '[button]'
})
export class ButtonDirective extends ThemeExtension {

  protected buildExtension(): string {
    return 'button';
  }

}

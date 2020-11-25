import { Directive } from '@angular/core';
import { ThemeExtension } from '../theme-extension.interface';

@Directive({
  selector: '[buttonEmpty]'
})
export class ButtonEmptyDirective extends ThemeExtension {

  protected buildExtension(): string {
    return 'button-empty';
  }

}

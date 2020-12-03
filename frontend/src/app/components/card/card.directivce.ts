import { Input, Directive } from '@angular/core';

@Directive({
  selector: '[card]'
})
export class CardDirective {
  @Input()
  title: string;
  @Input()
  errorMessage: string;
}

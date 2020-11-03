import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[stages]'
})
export class StagesDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}

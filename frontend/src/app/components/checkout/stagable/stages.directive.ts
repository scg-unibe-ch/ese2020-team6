import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[stagesBox]'
})
export class StagesDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}

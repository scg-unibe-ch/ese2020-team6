import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StageNavigationDataEmitter } from '../stage-navigation-data-emitter.directive';

@Component({
  selector: 'shipping-stage',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent extends StageNavigationDataEmitter<string> {

  public value: string;

  @Output()
  logger: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
    super();
  }

  protected getData(): string {
    return this.value;
  }

  public logData(): void {
    this.emitData();
    this.logger.emit();
  }

}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Stage } from '../stage';

@Component({
  selector: 'shipping-stage',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent extends Stage<string> implements OnInit {

  public value: string;

  @Output()
  logger: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  protected getData(): string {
    return this.value;
  }

  public logData(): void {
    this.logger.emit();
  }

}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StageNavigationDataEmitter } from '../stage-navigation-data-emitter.directive';

@Component({
  selector: 'shipping-stage',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent extends StageNavigationDataEmitter<any> {

  public searchResults: any;

  @Output()
  logger: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
    super();
  }

  protected getData(): any {
    let result;
    this.searchResults.results.forEach(element => {
      result = element;
    });
    return result;
  }

  public logData(searchResults: { results: Array<any> }): void {
    this.searchResults = searchResults;
    this.emitData();
    this.logger.emit();
  }

}

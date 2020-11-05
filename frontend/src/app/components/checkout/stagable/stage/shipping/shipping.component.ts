import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StageNDEExtention } from '../stage-navigation-data-emitter-extention.directive';

@Component({
  selector: 'shipping-stage',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent extends StageNDEExtention<any> {

  public searchResults: any;

  public addressSelectionOptions: Array<[string, string]> = [
    ['Home Address', 'home'],
    ['Other Address', 'other']
  ];
  public address: string = this.addressSelectionOptions[0][1];

  @Output()
  logger: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
    super();
  }

  protected getData(): any {
    let result;
    this.searchResults.results.forEach(element => {
      result = element;
      console.log(element);

    });
    return result;
  }

  get addressText(): string {
    if (this.searchResults) return this.searchResults.results[0].text;
    return this.user.street + ' ' + this.user.houseNumber + ', ' + this.user.plz + ', ' + this.user.city;
  }

  public logData(searchResults: { results: Array<any> }): void {
    this.searchResults = searchResults;
    this.emitData();
    this.logger.emit();
  }

}

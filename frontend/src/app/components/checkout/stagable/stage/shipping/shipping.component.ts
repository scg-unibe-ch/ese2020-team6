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
  public isHomeAddress: boolean = true;
  public isHomeAddressApproved: boolean = false;

  constructor() {
    super();
  }

  protected getData(): any {
    return this.addressText;
  }

  get addressText(): string {
    if (this.searchResults) return this.searchResults.results[0].text;
    return this.user.street + ' ' + this.user.houseNumber + ', ' + this.user.plz + ', ' + this.user.city;
  }

  public onSearch(searchResults: { results: Array<any> }): void {
    if (searchResults.results.length > 0) {
      this.searchResults = searchResults;
      this.isHomeAddress = false;
    }
  }

  get approveHomeAddressClass(): Array<string> {
    let classes: Array<string> = new Array<string>();
    classes.push(this.isHomeAddressApproved ? 'approved' : 'not-approved');
    return classes;
  }

  get approveHomeAddressClassExtentions(): Array<string> {
    let classes: Array<string> = new Array<string>();
    classes.push(this.isHomeAddressApproved ? 'button' : 'button-warn');
    return classes;
  }

  public onApproveAddress(): void {
    this.isHomeAddressApproved = true;
  }

  public backToHomeAddress() {
    this.searchResults = null;
    this.isHomeAddress = true;
    this.isHomeAddressApproved = false;
  }
}

import { Component } from '@angular/core';
import { Address, NullAddress } from '../../../../../models/map/address/address.model';
import { StageNDEExtention } from '../stage-navigation-data-emitter-extention.directive';

@Component({
  selector: 'shipping-stage',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent extends StageNDEExtention<Address> {

  public isHomeAddress: boolean = true;
  public isHomeAddressApproved: boolean = false;
  public address: Address = new NullAddress();

  constructor() {
    super();
  }

  protected getData(): Address {
    return this.address;
  }

  public onSearch(): void {
    if (!Object.is(this.address, this.buyer.address)) {
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
    this.onBuyerLoad();
    this.isHomeAddress = true;
    this.isHomeAddressApproved = false;
  }

  protected onProductLoad(): void {}

  protected onSellerLoad(): void {}

  protected onBuyerLoad(): void {
    this.address = this.buyer.address;
  }
}

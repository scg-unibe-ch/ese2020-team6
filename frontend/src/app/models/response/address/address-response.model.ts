import { AddressModel, Address } from '../../map/address/address.model';

export interface AddressResponseModel extends AddressModel {}


export class AddressResponse implements AddressResponseModel {
  constructor(
    public streetName: string,
    public streetType: string,
    public addressNumber: string,
    public streetAddress: string,
    public neighbourhood: string,
    public city: string,
    public region: string,
    public postal: number,
    public country: string
  ) {}

  public toRouterString(): string {
    throw new Error("Method not implemented.");
  }

  static isAddressResponseModel(address: AddressResponseModel): address is AddressResponseModel {
    return Address.isAddressModel(address)
  }
}

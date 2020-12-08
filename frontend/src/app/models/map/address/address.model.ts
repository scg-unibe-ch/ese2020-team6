import { SearchResultModel } from '../search/search-result.model';
import { Equality } from 'src/app/models/compare/equality';
import { Is } from 'src/app/models/compare/is';
import { AddressResponseModel } from '../../response/response.module';

export interface AddressModel {
  streetName: string;
  streetType: string;
  addressNumber: string;
  streetAddress: string;
  neighbourhood: string;
  city: string;
  region: string;
  postal: number;
  country: string;

  toRouterString(): string;
}

export interface SearchAddressModel {
  StName: string;
  StType: string;
  AddNum: string;
  StAddr: string;
  Nbrhd: string;
  City: string;
  Region: string;
  Postal: number;
  Country: string;
}

export class Address implements AddressModel {
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
  ) { }

  public toString = () : string => {
    return this.streetAddress + ", "
    + (this.neighbourhood ? this.neighbourhood + ", " : "")
    + this.city + ", "
    + this.region + ", "
    + this.postal + ", "
    + this.country;
  }

  public toRouterString(): string {
    return this.toString().split(', ').join('-').split(' ').join('-');
  }

  public static buildFromMapSearchResults(searchResult: SearchResultModel<SearchAddressModel>): Address {
    let address: SearchAddressModel = searchResult.properties;
    return new Address(
      address.StName,
      address.StType,
      address.AddNum,
      address.StAddr,
      address.Nbrhd,
      address.City,
      address.Region,
      address.Postal,
      address.Country
    )
  }

  public static buildFromAddressModel(address: AddressModel): Address {
    return new Address(
      address.streetName,
      address.streetType,
      address.addressNumber,
      address.streetAddress,
      address.neighbourhood,
      address.city,
      address.region,
      address.postal,
      address.country
    )
  }

  public static buildFromAddressResponseModel(address: AddressResponseModel): Address {
    return Address.buildFromAddressModel(address);
  }

  public static equals(addressOne: Address, addressTwo: Address): boolean {
    return Equality.equals(addressOne, addressTwo);
  }

  public static isAddress(address: Address): address is Address {
    return Address.isAddressModel(address as AddressModel);
  }

  public static isAddressModel(address: AddressModel): address is AddressModel {
    return Is.is(address, [
      'streetName',
      'streetType',
      'addressNumber',
      'streetAddress',
      'neighbourhood',
      'city',
      'region',
      'postal',
      'country'
    ]);
  }
}

export class NullAddress extends Address {
  private static _instance: NullAddress;

  constructor() {
    super(null, null, null, null, null, null,
      null, null, null);
  }

  public static instance(): NullAddress {
    if (!NullAddress._instance) NullAddress._instance = new NullAddress();
    return NullAddress._instance;
  }

}

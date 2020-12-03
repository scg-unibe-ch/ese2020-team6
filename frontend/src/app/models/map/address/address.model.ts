import { SearchResultModel } from '../search/search-result.model';

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

  public static isAddress(address: Address): address is Address {
    return address.streetName
        && address.streetType
        && address.addressNumber
        && address.streetAddress
        && address.neighbourhood !== null
        && address.neighbourhood !== undefined
        && address.neighbourhood.length >= 0
        && address.city
        && address.region
        && address.postal
        && address.country ? true : false;
  }


  static equals(addressOne: Address, addressTwo: Address): boolean {
    return addressOne.equals(addressTwo);
  }

  public equals(address: Address): boolean {
    return address.streetName === this.streetName
        && address.streetType === this.streetType
        && address.addressNumber === this.addressNumber
        && address.streetAddress === this.streetAddress
        && address.neighbourhood === this.neighbourhood
        && address.city === this.city
        && address.region === this.region
        && address.postal === this.postal
        && address.country === this.country;
  }
}

export class NullAddress extends Address {
  streetName: string = null;
  streetType: string = null;
  addressNumber: string = null;
  streetAddress: string = null;
  neighbourhood: string = null;
  city: string = null;
  region: string = null;
  postal: number = null;
  country: string = null;

  constructor() {
    super(null, null, null, null, null, null, null, null, null)
  }
}

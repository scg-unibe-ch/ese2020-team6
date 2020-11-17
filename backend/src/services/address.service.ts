import { AddressAttributes, Address } from '../models/address.model';

export class AddressService {

    public static checkAddressAttributes(address: AddressAttributes): Promise<void> {
      if (!address || Object.keys(address).length === 0) {
        return Promise.reject({ message: 'Address missing!' });
      }
      if (address.addressId) {
        return Promise.reject({ message: 'Cannot set the address Id of a new address!' });
      }
      return Promise.resolve();
    }

    public static getAddressByValues(address: AddressAttributes): Promise<Address> {
      return Address.findOne({
        where: address
      });
    }

    public static getAddressById(addressId: number): Promise<Address> {
      return Address.findOne({
        where: {
          addressId: addressId
        }
      });
    }

    public static addressDoesExist(address: AddressAttributes): Promise<number> {
      return this.getAddressByValues(address).then((existingAddress: AddressAttributes) => {
        if (existingAddress) {
          return Promise.resolve(existingAddress.addressId);
        } else {
          return Promise.reject();
        }
      }).catch(err => Promise.reject(err));
    }

    public static createAddress(address: AddressAttributes): Promise<Address> {
      return Address.create(address);
    }
}

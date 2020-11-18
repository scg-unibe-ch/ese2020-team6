import { Address, AddressAttributes, AddressCreationAttributes } from '../models/address.model';

export class AddressService {


    public static checkAddressAttributes(
      address: AddressCreationAttributes
    ): Promise<AddressCreationAttributes> {
      if (!address || Object.keys(address).length === 0) {
        return Promise.reject({ message: 'Address missing!' });
      }
      if (address.addressId) {
        return Promise.reject({ message: 'Cannot set the address Id of a new address!' });
      }
      return Promise.resolve(address);
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

    public static findOrCreate(address: AddressCreationAttributes): Promise<Address> {
      return Address.findOrCreate({
        where: address,
        defaults: address
      }).then(([createdAddress, created]: [Address, boolean]) => Promise.resolve(createdAddress))
      .catch((err: any) => Promise.reject(err));
      }
}

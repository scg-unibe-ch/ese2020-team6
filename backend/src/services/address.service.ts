import { AddressAttributes, Address } from '../models/address.model';

export class AddressService {

    public static getAddressByValues(address: AddressAttributes): Promise<Address> {
      return Address.findOne({
        where: address
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

}

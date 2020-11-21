import { Transaction } from 'sequelize';
import { Address, AddressAttributes, AddressCreationAttributes } from '../models/address.model';
import { InstanceDoesNotExistError } from '../errors/instance-does-not-exist.error';

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

    public static getAddressByValues(address: AddressCreationAttributes, transaction?: Transaction): Promise<Address> {
      if (Object.keys(address).length === 0) {
        return Promise.reject(new InstanceDoesNotExistError(Address.getTableName()));
      }
      return Address.findOne({
        where: address,
        transaction: transaction
      }).then((foundAddress: Address) => {
        if (foundAddress) {
          return Promise.resolve(foundAddress);
        } else {
          return Promise.reject(new InstanceDoesNotExistError(Address.getTableName()));
        }
      });
    }

    public static getAddressById(addressId: number, transaction?: Transaction): Promise<Address> {
      return Address.findByPk(addressId, { transaction: transaction });
    }

    public static addressDoesExist(address: AddressCreationAttributes, transaction?: Transaction): Promise<Address> {
      return this.getAddressByValues(address, transaction);
    }

    public static createAddress(address: AddressCreationAttributes): Promise<Address> {
      return Address.create(address);
    }

    public static findOrCreateAddress(address: AddressCreationAttributes, transaction?: Transaction): Promise<Address> {
      return this.addressDoesExist(address, transaction).catch((err: any) => {
        if (err instanceof InstanceDoesNotExistError) {
          return Address.create(address, { transaction: transaction });
        } else {
          return Promise.reject(err);
        }
      });
    }
}

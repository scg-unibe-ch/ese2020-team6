import { Observable, OperatorFunction } from 'rxjs';
import { Address, AddressModel } from '../map/address/address.model'
import { transformator } from './transformator';

export function transformAddress<T>(): OperatorFunction<any, any> {
  return transformator<AddressModel, T>(Address.buildFromAddressModel, Address.isAddressModel);
}

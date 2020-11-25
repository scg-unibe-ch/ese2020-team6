import { Observable } from 'rxjs';
import { Address, AddressModel } from './address.model'
import { transformator } from '../../operator/transformator.model';

export function transformAddress<T>(source: Observable<T>): Observable<T> {
  return transformator<AddressModel, T>(source, Address.buildFromAddressModel, 'address', 'Address');
}

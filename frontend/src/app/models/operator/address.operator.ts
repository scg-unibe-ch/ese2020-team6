import { Observable, OperatorFunction } from 'rxjs';
import { Address, AddressModel } from '../map/address/address.model'
import { transformator } from './transformator';

export function transformAddress<T>(): OperatorFunction<any, any> {
  return transformator<AddressModel, T>(Address.buildFromAddressModel, Address.isAddressModel);
}

export function directTransfromAddress(source: Observable<AddressModel>): Observable<Address> {
  return new Observable(subscriber => {
    const subscription = source.subscribe({
      next(addressModel: AddressModel) {
        let categories: Address = Address.buildFromAddressModel(addressModel);
        subscriber.next(categories);
      },
      error(error) {
        subscriber.error(error);
      },
      complete() {
        subscriber.complete();
      }
    });
    return () => subscription.unsubscribe();
  });
}

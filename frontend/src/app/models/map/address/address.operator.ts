import { Observable, Subscription} from 'rxjs';
import { map } from 'rxjs/operators';
import { Address, AddressModel } from './address.model';

type RecursiveAddress = { address: AddressModel | null; path: Array<string>; hasAddress: boolean; };

export function transformAddress<T>(source: Observable<T>): Observable<T> {
  return new Observable(subscriber => {
    const subscription = source.subscribe({
      next(value) {
        if (Array.isArray(value)) {
          value.forEach((object: Object) => {
            transformObjectAddress(object);
          });
        } else {
          transformObjectAddress(value);
        }
        subscriber.next(value);
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

function transformObjectAddress(object: Object): void {
  let recursiveAddress: RecursiveAddress = hasAddress(object);
  if (recursiveAddress.hasAddress) {
    let addressModel: AddressModel = recursiveAddress.address;
    let address: Address = Address.buildFromAddressModel(addressModel);
    recursiveAddress.path.forEach((pathSegement: string) => {
      if (pathSegement === 'address') object[pathSegement] = address;
      else object = object[pathSegement];
    });
  }
}

function hasAddress(object: Object): RecursiveAddress {
  return recursiveHasAddress('', object);
}

function recursiveHasAddress(parentKey: string, objectOfParentKey: Object): RecursiveAddress {
  if (!objectOfParentKey) return { address: null, path: [], hasAddress: false };
  let childKeys: Array<string> = Object.keys(objectOfParentKey);

  if (parentKey ===  'address') return { address: objectOfParentKey as AddressModel, path: [parentKey], hasAddress: true };
  else if (childKeys.length === 0 || typeof objectOfParentKey !== 'object') return { address: null, path: [], hasAddress: false };
  else {
    let returnRecursiveAddress: RecursiveAddress = { address: null, path: [], hasAddress: false };
    Object.keys(objectOfParentKey).every((childKey: string) => {
      let recursiveAddress: RecursiveAddress = recursiveHasAddress(childKey, objectOfParentKey[childKey]);
      if (recursiveAddress.hasAddress === true) {
        if (parentKey !== '') {
          recursiveAddress.path.unshift(parentKey);
        }
        returnRecursiveAddress = {
          address: recursiveAddress.address,
          path: recursiveAddress.path,
          hasAddress: true
        }
        return false;
      }
      return true;
    });
    return returnRecursiveAddress;
  }
}

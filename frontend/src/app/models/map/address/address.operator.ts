import { Observable, Subscription} from 'rxjs';
import { map } from 'rxjs/operators';
import { Address, AddressModel } from './address.model';

type Path = [string, Array<Path> | AddressModel];

export function transformAddress<T>(source: Observable<T>): Observable<T> {
  return new Observable(subscriber => {
    const subscription = source.subscribe({
      next(value) {
        transformObjectAddress(value);
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
  let paths: Path = hasAddresses(object);
  (paths[1] as Array<Path>).forEach((path: Path) => {
    recursiveTansfromObjectAddress(path, object);
  });
}

function recursiveTansfromObjectAddress(paths: Path, object: Object): void {
  let parentKey: string = paths[0];
  let childPaths: Array<Path> | AddressModel = paths[1];

  if (Array.isArray(childPaths) && !(parentKey.includes('address') || parentKey.includes('Address'))) {
    (childPaths as Array<Path>).forEach((childPath: Path) => {
      recursiveTansfromObjectAddress(childPath, object[parentKey]);
    });
  } else {
    let address: Address = Address.buildFromAddressModel((childPaths as AddressModel));
    object[parentKey] = address;
  }
}

function hasAddresses(object: Object): Path {
  return recursiveHasAddresses('', object);
}

function recursiveHasAddresses(parentKey: string, objectOfParentKey: Object): Path | null {
  if (!objectOfParentKey || typeof objectOfParentKey !== 'object') return null;
  else if ((parentKey.includes('address') || parentKey.includes('Address')) && !parentKey.includes('Id')) {
    return [parentKey, objectOfParentKey as AddressModel];
  } else {
    let childEntries: Array<[string, any]> = Object.entries(objectOfParentKey);
    let childPaths: Array<Path> = new Array<Path>();

    childEntries.forEach(([childKey, childEntry]: [string, Object]) => {
      let childPath: Path = recursiveHasAddresses(childKey, childEntry);
      if (childPath) {
        childPaths.push(childPath);
      }
    });

    if (childPaths.length == 0) return null;
    else return [parentKey, childPaths];
  }
}

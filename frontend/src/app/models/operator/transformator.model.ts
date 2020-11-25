import { Observable, Subscription, Subscriber} from 'rxjs';

export function transformator<T, S>(source: Observable<S>, transformationMethod: (model: T) => any, ...indicators: Array<string>): Observable<S> {
  return new Observable((subscriber: Subscriber<S>) => {
    const subscription = source.subscribe({
      next(value: S) {
        if (indicators.length === 0) throw new Error('Needs at least one indicator!');
        transformObject(value, indicators, transformationMethod);
        subscriber.next(value);
      },
      error(error: any) {
        subscriber.error(error);
      },
      complete() {
        subscriber.complete();
      }
    });
    return () => subscription.unsubscribe();
  });
}

type Path<T> = [string, Array<Path<T>> | T];

function transformObject<T>(object: Object, indicators: Array<string>, transformationMethod: (model: T) => any): void {
  let paths: Path<T> = hasType<T>(object, indicators);
  if (paths) {
    (paths[1] as Array<Path<T>>).forEach((path: Path<T>) => {
      recursiveTansfromObjectType(path, object, indicators, transformationMethod);
    })
  }
}


function recursiveTansfromObjectType<T>(paths: Path<T>, object: Object, indicators: Array<string>, transformationMethod: (model: T) => any): void {
  let parentKey: string = paths[0];
  let childPaths: Array<Path<T>> | T = paths[1];

  if (Array.isArray(childPaths) && !keyIncludesIndicators(parentKey, indicators)) {
    (childPaths as Array<Path<T>>).forEach((childPath: Path<T>) => {
      recursiveTansfromObjectType<T>(childPath, object[parentKey], indicators, transformationMethod);
    });
  } else {
    object[parentKey] = transformationMethod((childPaths as T));
  }
}

function hasType<T>(object: Object, indicators: Array<string>): Path<T> {
  return recursiveHasType<T>('', object, indicators);
}

function recursiveHasType<T>(parentKey: string, objectOfParentKey: Object, indicators: Array<string>): Path<T> | null {
  if (!objectOfParentKey || Object.keys(objectOfParentKey).length === 0 || typeof objectOfParentKey !== 'object') return null;
  else if (isType(parentKey, indicators)) {
    return [parentKey, objectOfParentKey as T];
  } else {
    let childEntries: Array<[string, any]> = Object.entries(objectOfParentKey);
    searchInChildEntries(parentKey, childEntries, indicators)
  }
}

function searchInChildEntries<T>(parentKey: string, childEntries: Array<[string, any]>, indicators: Array<string>): [string, Array<Path<T>>] | null {
  let childPaths: Array<Path<T>> = new Array<Path<T>>();

  childEntries.forEach(([childKey, childEntry]: [string, Object]) => {
    let childPath: Path<T> = recursiveHasType<T>(childKey, childEntry, indicators);
    if (childPath) {
      childPaths.push(childPath);
    }
  });

  if (childPaths.length == 0) return null;
  else return [parentKey, childPaths];
}

function isType(key, indicators): boolean {
  return keyIncludesIndicators(key, indicators) && !key.includes('Id');
}

function keyIncludesIndicators(key: string, indicators: Array<string>): boolean {
  return indicators.map((indicator: string) => key.includes(indicator)).includes(true)
}

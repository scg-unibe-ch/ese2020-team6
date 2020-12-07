import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

export function transformator<T, S>(transformationMethod: (model: T) => any,  isType: (value: T) => value is T): OperatorFunction<any, any> {
  return <S>(source: Observable<S>) => {
    return source.pipe(map((value: S) => {
      return transformObject(value, isType, transformationMethod);
    }))
  }
}

type Path<T> = [string, Array<Path<T>> | T];

function isPath<T>(path: Path<T>): path is Path<T> {
  return Array.isArray(path) && path.length == 2 && typeof path[0] === 'string' && path[1] ? true : false;
}

function isPathArray<T>(pathArray: Array<Path<T>>): pathArray is Array<Path<T>> {
  if (Array.isArray(pathArray)) {
    return !pathArray.map((path: Path<T>) => isPath(path)).includes(false);
  } else return false;
}

function transformObject<T>(object: Object, isType: (value: T) => value is T, transformationMethod: (model: T) => any): Object {
  let paths: Path<T> = hasType<T>(object, isType);
  if (paths) {
    if (!isPathArray(paths[1] as Array<Path<T>>)) {
      return transformationMethod(paths[1] as T);
    } else {
      (paths[1] as Array<Path<T>>).forEach((path: Path<T>) => {
        recursiveTansfromObjectType(path, object, isType, transformationMethod);
      })
    }
  }
  return object;
}


function recursiveTansfromObjectType<T>([parentKey, childPathsOrObject]: Path<T>, object: Object, isType: (value: T) => value is T, transformationMethod: (model: T) => any): void {
  if (Array.isArray(childPathsOrObject)) {
    (childPathsOrObject as Array<Path<T>>).forEach((childPath: Path<T>) => {
      recursiveTansfromObjectType<T>(childPath, object[parentKey], isType, transformationMethod);
    });
  } else {
    object[parentKey] = transformationMethod(childPathsOrObject as T);
  }
}

function hasType<T>(object: Object, isType: (value: T) => value is T): Path<T> {
  return recursiveHasType<T>('', object, isType);
}

function recursiveHasType<T>(parentKey: string, objectOfParentKey: Object, isType: (value: T) => value is T): Path<T> | null {
  if (!objectOfParentKey || Object.keys(objectOfParentKey).length === 0 || typeof objectOfParentKey !== 'object') return null;
  else if (isType(objectOfParentKey as T)) {
    return [parentKey, objectOfParentKey as T];
  } else {
    let childEntries: Array<[string, any]> = Object.entries(objectOfParentKey);
    return searchInChildEntries(parentKey, childEntries, isType)
  }
}

function searchInChildEntries<T>(parentKey: string, childEntries: Array<[string, any]>, isType: (value: T) => value is T): [string, Array<Path<T>>] | null {
  let childPaths: Array<Path<T>> = new Array<Path<T>>();

  childEntries.forEach(([childKey, childEntry]: [string, Object]) => {
    let childPath: Path<T> = recursiveHasType<T>(childKey, childEntry, isType);
    if (childPath) {
      childPaths.push(childPath);
    }
  });

  if (childPaths.length == 0) return null;
  else return [parentKey, childPaths];
}

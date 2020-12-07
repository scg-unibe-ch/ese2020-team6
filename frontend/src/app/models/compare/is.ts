export class Is {
  public static is<T>(object: T, keys: Array<string>): object is T {
    if (!object || object === null || object == null
        || object === undefined || object == undefined) return false;
    let hasKeys: Array<boolean> = keys.map((key: string) => {
          let value = object[key];
          if (value !== null && value != null
              && value !== undefined && value != undefined) return true;
          return false;
        });
    return !hasKeys.includes(false);
  }
}

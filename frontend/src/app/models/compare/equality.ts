export class Equality {
  static equals<S>(objectOne: S, objectTwo: S): boolean {
    return !Object.keys(objectOne).map((key: any) => [objectOne[key], objectTwo[key]])
      .map(([valueOne, valueTwo]: [any, any]) => valueOne === valueTwo)
      .includes(false);
  }
}

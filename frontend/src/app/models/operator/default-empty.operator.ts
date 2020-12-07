import { Observable, OperatorFunction } from 'rxjs';

export function defaultEmpty<T, S>(empty: S): OperatorFunction<any, any> {
  return (source: Observable<Array<T>>) => {
    return new Observable(subscriber => {
      const subscription = source.subscribe({
        next(values: Array<T>) {
          if (values.length === 0) {
            subscriber.next(empty);
          } else {
            subscriber.next(values);
          }
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
}

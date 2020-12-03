import { Observable, Subscription, Subscriber, OperatorFunction } from 'rxjs';

export function error<T, S>(catchError: (error: any) => void): OperatorFunction<any, any> {
  return <S>(source: Observable<S>) => {
    return new Observable((subscriber: Subscriber<S>) => {
      const subscription = source.subscribe({
        next(value: S) {
          subscriber.next(value);
        },
        error(error: any) {
          catchError(error);
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

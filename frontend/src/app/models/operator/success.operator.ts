import { Observable, Subscription, Subscriber, OperatorFunction } from 'rxjs';

export function success<T, S>(success: () => void): OperatorFunction<any, any> {
  return <S>(source: Observable<S>) => {
    return new Observable((subscriber: Subscriber<S>) => {
      const subscription = source.subscribe({
        next(value: S) {
          subscriber.next(value);
        },
        error(error: any) {
          subscriber.error(error);
        },
        complete() {
          success();
          subscriber.complete();
        }
      });
      return () => subscription.unsubscribe();
    });
  }
}

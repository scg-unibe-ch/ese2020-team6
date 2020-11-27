import { Observable, empty } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoaderObservable } from './loader-observable.interface';
import {
  ISubscription,
  LoaderSuccessSubscription,
  LoaderFailSubscription } from './loader-subscription.interface';
import { ILoaderObserver } from './loader-observer.interface';

export abstract class Loader<T> extends LoaderObservable<T> implements ILoaderObserver<T> {
  public successSubscription: LoaderSuccessSubscription<T>;
  public failSubscription: LoaderFailSubscription;
  constructor() {
    super();
  }
  public abstract onSuccess(value: T): void;
  public abstract onFail(error: any): void;
  public abstract onLoading(): void;
  public abstract onLoaded(): void;
  protected abstract buildObservable(): Observable<T>;
}

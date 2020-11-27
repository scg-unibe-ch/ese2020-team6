import { LoaderObservable } from './loader-observable.interface';
import { LoaderSuccessSubscription, LoaderFailSubscription } from './loader-subscription.interface';

export interface ILoaderSuccessObserver<T> extends ILoader { onSuccess(value: T): void; }

export interface ILoaderFailObserver extends ILoader{ onFail(error: any): void; }

export interface ILoader { onLoading(): void; onLoaded(): void; }

export interface LoaderSuccessObserver<T> extends ILoaderSuccessObserver<T> {
  successSubscription: LoaderSuccessSubscription<T>;
  onSuccess(value: T): void;
  onLoading(): void;
  onLoaded(): void;
}

export interface LoaderFailObserver extends ILoaderFailObserver {
  failSubscription: LoaderFailSubscription;
  onFail(error: any): void;
  onLoading(): void;
  onLoaded(): void;
}

export interface ILoaderObserver<T> extends ILoaderSuccessObserver<T>, ILoaderFailObserver {
  successSubscription: LoaderSuccessSubscription<T>;
  failSubscription: LoaderFailSubscription;
  onSuccess(value: T): void;
  onFail(error: any): void;
  onLoading(): void;
  onLoaded(): void;
}

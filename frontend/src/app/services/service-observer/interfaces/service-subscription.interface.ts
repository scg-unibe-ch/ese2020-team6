import { IServiceObservable, ILoaderObservable } from './service-observable.interface';
import { IServiceObserver, ILoaderObserver } from './service-observer.interface';

export interface IServiceSubscription<T> {
  id: number;
  observer: IServiceObserver<T>;
  observable: IServiceObservable<T>;
  notifySuccess(value: T): void;
  notifyFail(error: any): void;
  unsubscribe(): Promise<IServiceSubscription<T>>;
  resubscribe(observable: IServiceObservable<T>): Promise<IServiceSubscription<T>>;
}

export interface ILoaderSubsctiption<T> extends IServiceSubscription<T> {
  observer: ILoaderObserver<T>;
  observable: ILoaderObservable<T>;
  onLoading(): Promise<void>;
  onLoaded(success: boolean): Promise<void>;
  onUnload(): Promise<void>;
}

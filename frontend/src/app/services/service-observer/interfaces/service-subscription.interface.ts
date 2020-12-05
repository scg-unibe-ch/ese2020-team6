import { IServiceObservable, ILoaderObservable } from './service-observable.interface';
import { IServiceObserver, ILoaderObserver } from './service-observer.interface';

export interface IServiceSubscription<Output> {
  id: number;
  observer: IServiceObserver<Output>;
  observable: IServiceObservable<Output>;
  notifySuccess(value: Output): void;
  notifyFail(error: any): void;
  unsubscribe(): Promise<IServiceSubscription<Output>>;
  resubscribe(observable: IServiceObservable<Output>): Promise<IServiceSubscription<Output>>;
}

export interface ILoaderSubsctiption<Input, Output> extends IServiceSubscription<Output> {
  observer: ILoaderObserver<Input, Output>;
  observable: ILoaderObservable<Input, Output>;
  onLoading(): Promise<void>;
  onLoaded(success: boolean): Promise<void>;
  onUnload(): Promise<void>;
}

import { IServiceObservable, ILoaderObservable } from "./service-observable.interface";
import { IServiceSubscription, ILoaderSubsctiption } from "./service-subscription.interface";

export interface IServiceObserver<T>  {
  onSuccess: (value: T) => void;
  onFail: (error: any) => void;
  buildSubscription(observable: IServiceObservable<T>): IServiceSubscription<T>;
}

export interface ILoaderObserver<T> extends IServiceObserver<T> {
  onLoading: () => void;
  onLoaded: (success: boolean) => void;
  onUnload: () => void;
  onUnloadCascade: ILoaderObservable<any>;
  buildSubscription(observable: ILoaderObservable<T>): ILoaderSubsctiption<T>;
}

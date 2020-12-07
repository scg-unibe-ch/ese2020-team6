import { IServiceObservable, ILoaderObservable } from "./service-observable.interface";
import { IServiceSubscription, ILoaderSubsctiption } from "./service-subscription.interface";

export interface IServiceObserver<Output>  {
  onSuccess: (value: Output) => void;
  onFail: (error: any) => void;
  buildSubscription(observable: IServiceObservable<Output>): IServiceSubscription<Output>;
}

export interface ILoaderObserver<Input, Output> extends IServiceObserver<Output> {
  onLoading: () => void;
  onLoaded: (success: boolean) => void;
  onUnload: () => void;
  onUnloadCascade: ILoaderObservable<any, any>;
  buildSubscription(observable: ILoaderObservable<Input, Output>): ILoaderSubsctiption<Input, Output>;
}

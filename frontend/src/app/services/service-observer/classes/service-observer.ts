import { IServiceObservable } from "../interfaces/service-observable.interface";
import { IServiceSubscription } from "../interfaces/service-subscription.interface";
import { IServiceObserver } from "../interfaces/service-observer.interface";
import { ServiceSubsctiption } from "./service-subscription";

export abstract class ServiceObserver<T> implements IServiceObserver<T>  {
  public abstract onSuccess: (value: T) => void;
  public abstract onFail: (error: any) => void;
  public buildSubscription(observable: IServiceObservable<T>): IServiceSubscription<T> {
    return new ServiceSubsctiption(this, observable);
  }
}

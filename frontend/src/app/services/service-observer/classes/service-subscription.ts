import { IServiceObservable } from '../interfaces/service-observable.interface';
import { IServiceObserver } from '../interfaces/service-observer.interface';
import { IServiceSubscription } from '../interfaces/service-subscription.interface';

export class ServiceSubsctiption<T> implements IServiceSubscription<T> {
  private static staticSubscriptionId: number = 0;
  public id: number;

  constructor(
    public observer: IServiceObserver<T>,
    public observable: IServiceObservable<T>
  ) {
    this.id = ServiceSubsctiption.staticSubscriptionId++;
  }

  public notifySuccess(value: T): void {
    return this.observer.onSuccess(value);
  }
  public notifyFail(error: any): void {
    return this.observer.onFail(error);
  }
  public unsubscribe(): Promise<IServiceSubscription<T>> {
    return this.observable.unsubscribe(this);
  }
  public resubscribe(observable: IServiceObservable<T>): Promise<IServiceSubscription<T>> {
    this.observable = observable;
    return observable.resubscribe(this);
  }
}

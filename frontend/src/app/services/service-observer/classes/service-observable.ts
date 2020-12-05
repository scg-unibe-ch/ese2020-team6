import { IServiceObservable } from '../interfaces/service-observable.interface';
import { IServiceObserver } from '../interfaces/service-observer.interface';
import { IServiceSubscription } from '../interfaces/service-subscription.interface';

export abstract class ServiceObservable<T> implements IServiceObservable<T> {

  public subscriptions: Array<IServiceSubscription<T>> = new Array<IServiceSubscription<T>>();


  public subscribe(observer: IServiceObserver<T>): Promise<IServiceSubscription<T>> {
    let subscription: IServiceSubscription<T> = observer.buildSubscription(this);
    this.subscriptions.push(subscription);
    return Promise.resolve(subscription);
  }
  public unsubscribe(subscription: IServiceSubscription<T>): Promise<IServiceSubscription<T>> {
    let subscriptionIndex: number = this.indexOfSubscription(subscription);
    if (subscriptionIndex < 0) return Promise.reject(new Error('No subscription with id ' + subscription.id + ' found!'));
    this.subscriptions.splice(subscriptionIndex, 1);
    return Promise.resolve(subscription);
  }

  public resubscribe(subscription: IServiceSubscription<T>): Promise<IServiceSubscription<T>> {
    if (this.includesSubsctiption(subscription)) return Promise.reject(new Error("Subscription with id " + subscription.id + " already exists!"));
    this.subscriptions.push(subscription);
    return Promise.resolve(subscription);
  }

  private mapSubsctiptionsToId(): Array<number>;
  private mapSubsctiptionsToId(subscriptions: Array<IServiceSubscription<T>>): Array<number>;
  private mapSubsctiptionsToId(subscriptions?: Array<IServiceSubscription<T>>): Array<number> {
    if (subscriptions) {
      return subscriptions
      .map((storedSubscription: IServiceSubscription<T>) => storedSubscription.id)
    } else {
      return this.subscriptions
      .map((storedSubscription: IServiceSubscription<T>) => storedSubscription.id)
    }
  }

  private includesSubsctiption(subscription: IServiceSubscription<T>): boolean {
    return this.mapSubsctiptionsToId().includes(subscription.id);
  }

  protected indexOfSubscription(subscription: IServiceSubscription<T>): number {
    return this.mapSubsctiptionsToId().indexOf(subscription.id);
  }

  protected subscriptionOfId(id: number): IServiceSubscription<T> {
    return this.subscriptions[this.mapSubsctiptionsToId().indexOf(id)];
  }

  public notifyObservers(valueChange: Promise<T>): Promise<void> {
    return valueChange.then((value: T) => this.notifyObserversSuccess(value))
    .catch((error: any) => this.notifyObserversFail(error));
  }

  public notifyObserversSuccess(value: T): Promise<void> {
    return Promise.all(this.subscriptions.map((subscription: IServiceSubscription<T>) => {
      subscription.notifySuccess(value)
    })).then(() => Promise.resolve());
  }

  public notifyObserversFail(error: any): Promise<void> {
    return Promise.all(this.subscriptions.map((subscription: IServiceSubscription<T>) => {
      subscription.notifyFail(error)
    })).then(() => Promise.resolve());
  }

  public notifyObserver(subscription: IServiceSubscription<T>, valueCange: Promise<T>): Promise<void>{
    return valueCange.then((value: T) => this.notifyObserverSuccess(subscription, value))
    .catch((error: any) => this.notifyObserverFail(subscription, error));
  }

  public notifyObserverSuccess(subscription: IServiceSubscription<T>, value: T): Promise<void> {
    return Promise.resolve(subscription.notifySuccess(value))
  }

  public notifyObserverFail(subscription: IServiceSubscription<T>, error: any): Promise<void> {
    return Promise.resolve(subscription.notifyFail(error))
  }

}

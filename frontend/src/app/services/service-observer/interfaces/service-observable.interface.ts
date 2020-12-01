import { IServiceObserver, ILoaderObserver } from './service-observer.interface';
import { IServiceSubscription, ILoaderSubsctiption } from './service-subscription.interface';
import { IServiceSource } from '../../service-source/interfaces/service-source.interface';

export interface IServiceObservable<T> extends IServiceSource<T> {
  subscriptions: Array<IServiceSubscription<T>>;
  subscribe(observer: IServiceObserver<T>): Promise<IServiceSubscription<T>>;
  unsubscribe(subscription: IServiceSubscription<T>): Promise<IServiceSubscription<T>>;
  resubscribe(subscription: IServiceSubscription<T>): Promise<IServiceSubscription<T>>;
  notifyObservers(valueChange: Promise<T>): Promise<void>;
  notifyObserversSuccess(value: T): Promise<void>;
  notifyObserversFail(value: T): Promise<void>;
  notifyObserver(subscription: IServiceSubscription<T>, valueCange: Promise<T>): Promise<void>;
  notifyObserverSuccess(subscription: IServiceSubscription<T>, value: T): Promise<void>;
  notifyObserverFail(subscription: IServiceSubscription<T>, error: any): Promise<void>;
}

export interface ILoaderObservable<T> extends IServiceObservable<T> {
  subscriptions: Array<ILoaderSubsctiption<T>>;
  subscribe(observer: ILoaderObserver<T>): Promise<ILoaderSubsctiption<T>>;
  unsubscribe(subscription: ILoaderSubsctiption<T>): Promise<ILoaderSubsctiption<T>>;
  load(): Promise<void>;
  unload(): Promise<void>;
}

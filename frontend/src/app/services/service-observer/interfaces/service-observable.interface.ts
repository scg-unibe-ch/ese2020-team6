import { IServiceObserver, ILoaderObserver } from './service-observer.interface';
import { IServiceSubscription, ILoaderSubsctiption } from './service-subscription.interface';
import { IServiceSource } from '../../service-source/interfaces/service-source.interface';

export interface IServiceObservable<Output> {
  subscriptions: Array<IServiceSubscription<Output>>;
  subscribe(observer: IServiceObserver<Output>): Promise<IServiceSubscription<Output>>;
  unsubscribe(subscription: IServiceSubscription<Output>): Promise<IServiceSubscription<Output>>;
  resubscribe(subscription: IServiceSubscription<Output>): Promise<IServiceSubscription<Output>>;
  notifyObservers(valueChange: Promise<Output>): Promise<void>;
  notifyObserversSuccess(value: Output): Promise<void>;
  notifyObserversFail(value: Output): Promise<void>;
  notifyObserver(subscription: IServiceSubscription<Output>, valueCange: Promise<Output>): Promise<void>;
  notifyObserverSuccess(subscription: IServiceSubscription<Output>, value: Output): Promise<void>;
  notifyObserverFail(subscription: IServiceSubscription<Output>, error: any): Promise<void>;
}

export interface ILoaderObservable<Input, Output> extends IServiceObservable<Output>, IServiceSource<Input> {
  subscriptions: Array<ILoaderSubsctiption<Input, Output>>;
  subscribe(observer: ILoaderObserver<Input, Output>): Promise<ILoaderSubsctiption<Input, Output>>;
  unsubscribe(subscription: ILoaderSubsctiption<Input, Output>): Promise<ILoaderSubsctiption<Input, Output>>;
  load(): Promise<void>;
  unload(): Promise<void>;
}

import { ILoaderObserver } from '../interfaces/service-observer.interface';
import { ILoaderObservable } from '../interfaces/service-observable.interface';
import { ILoaderSubsctiption } from '../interfaces/service-subscription.interface';
import { ServiceSubsctiption } from './service-subscription';

export class LoaderSubsctiption<T> extends ServiceSubsctiption<T> implements ILoaderSubsctiption<T> {

  constructor(
    public observer: ILoaderObserver<T>,
    public observable: ILoaderObservable<T>
  ) {
    super(observer, observable);
  }

  public onLoading(): Promise<void> {
    return Promise.resolve(this.observer.onLoading());
  }
  public onLoaded(success: boolean): Promise<void> {
    return Promise.resolve(this.observer.onLoaded(success));
  }
  public onUnload(): Promise<void> {
    return Promise.resolve(this.observer.onUnload());
  }
  public unsubscribe(): Promise<LoaderSubsctiption<T>> {
    return this.observable.unsubscribe(this) as Promise<LoaderSubsctiption<T>>;
  }
  public resubscribe(observable: ILoaderObservable<T>): Promise<LoaderSubsctiption<T>> {
    this.observable = observable;
    return observable.resubscribe(this) as Promise<LoaderSubsctiption<T>>;
  }
}

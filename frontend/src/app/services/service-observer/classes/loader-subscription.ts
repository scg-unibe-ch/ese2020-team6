import { ILoaderObserver } from '../interfaces/service-observer.interface';
import { ILoaderObservable } from '../interfaces/service-observable.interface';
import { ILoaderSubsctiption } from '../interfaces/service-subscription.interface';
import { ServiceSubsctiption } from './service-subscription';

export class LoaderSubsctiption<S, T> extends ServiceSubsctiption<T> implements ILoaderSubsctiption<S, T> {

  constructor(
    public observer: ILoaderObserver<S, T>,
    public observable: ILoaderObservable<S, T>
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
  public unsubscribe(): Promise<LoaderSubsctiption<S, T>> {
    return this.observable.unsubscribe(this) as Promise<LoaderSubsctiption<S, T>>;
  }
  public resubscribe(observable: ILoaderObservable<S, T>): Promise<LoaderSubsctiption<S, T>> {
    this.observable = observable;
    return observable.resubscribe(this) as Promise<LoaderSubsctiption<S, T>>;
  }
}

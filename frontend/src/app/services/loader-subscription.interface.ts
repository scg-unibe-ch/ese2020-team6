import { LoaderObservable } from './loader-observable.interface';
import { ILoaderSuccessObserver, ILoaderFailObserver, ILoader } from './loader-observer.interface';

export abstract class ISubscription<T> implements ILoader {
  protected static staticSubscriptionId: number = 0;
  public subscriptionId: number;
  constructor(
    protected observable: LoaderObservable<T>,
    private loader: ILoader
  ) { this.subscriptionId = ISubscription.staticSubscriptionId++; }
  public abstract notify(value: T): void;
  public onLoading(): void { this.loader.onLoading(); }
  public onLoaded(): void { this.loader.onLoaded(); }
}

export class LoaderSuccessSubscription<T> extends ISubscription<T> {
  constructor(
    protected observable: LoaderObservable<T>,
    protected observer: ILoaderSuccessObserver<T>
  ) { super(observable, observer); }
  public notify(value: T): void { this.observer.onSuccess(value); }
}

export class LoaderFailSubscription extends ISubscription<any> {
  constructor(
    protected observable: LoaderObservable<any>,
    protected observer: ILoaderFailObserver
  ) { super(observable, observer); }
  public notify(error: any): void { this.observer.onFail(error); }
}

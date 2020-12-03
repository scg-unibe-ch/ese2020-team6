import { ILoaderObservable } from '../interfaces/service-observable.interface';
import { ServiceObservable } from './service-observable';
import { ILoaderSubsctiption } from '../interfaces/service-subscription.interface';
import { ILoaderObserver } from '../interfaces/service-observer.interface';
import { Observable } from 'rxjs';

export abstract class LoaderObservable<T> extends ServiceObservable<T> implements ILoaderObservable<T> {

  private isLoading: boolean = false;

  public abstract getSource(): Observable<T>;
  public abstract setSource(source: Observable<T>): Promise<Observable<T>>;

  subscriptions: Array<ILoaderSubsctiption<T>>;
  protected loadedPromise: Promise<T>;
  protected previousLoadedPromise: Promise<T>;

  public subscribe(observer: ILoaderObserver<T>, handleError?: (error: any) => void): Promise<ILoaderSubsctiption<T>> {
    return (super.subscribe(observer) as Promise<ILoaderSubsctiption<T>>)
    .then((subscription: ILoaderSubsctiption<T>) => this.loadAndReturnSubscription(subscription, handleError))
    .then((subscription: ILoaderSubsctiption<T>) => Promise.resolve(subscription))
  }

  private loadAndReturnSubscription(subscription: ILoaderSubsctiption<T>, handleError?: (error: any) => void): Promise<ILoaderSubsctiption<T>> {
    return this.loadSubscription(subscription)
    .then(() => Promise.resolve(subscription))
    .catch((error: any) => {handleError(error); return Promise.resolve(subscription)});
  }

  public unsubscribe(subscription: ILoaderSubsctiption<T>): Promise<ILoaderSubsctiption<T>> {
    if (this.isLoading) return Promise.reject(new Error('Tried to unsubscribe whilst loading!'))
    return super.unsubscribe(subscription) as Promise<ILoaderSubsctiption<T>>;
  }

  public load(): Promise<void> {
    return this.onLoading()
    .then(() => this.loadAndSavePromise())
    .then(() => this.check(this.loadedPromise))
    .then(() => this.notifyObservers(this.loadedPromise))
    .then(() => this.onLoadedSuccess())
    .catch((error: any) => this.catchCheck(error))
    .catch((error: any) => this.notifyObserversFail(error))
    .catch((error: any) => this.onLoadedFail(error))
    .then(() => Promise.resolve());
  }

  private loadSubscription(subscription: ILoaderSubsctiption<T>): Promise<void> {
    return this.onLoadingObserver(subscription)
    .then(() => this.check(this.loadedPromise))
    .then(() => this.notifyObserver(subscription, this.loadedPromise))
    .then(() => this.onLoadedObserverSuccess(subscription))
    .catch((error: any) => this.catchCheckObserver(subscription, error))
    .catch((error: any) => this.notifyObserverFail(subscription, error))
    .catch((error: any) => this.onLoadedObserverFail(subscription, error))
    .then(() => Promise.resolve())
  }

  public unload(): Promise<void> {
    this.setNewLoadedPromise(undefined)
    return this.onUnload();
  }

  private loadAndSavePromise(): Promise<T> {
    return this.setNewLoadedPromise(this.loadPromise())
  }

  protected loadPromise(): Promise<T> {
    return this.getSource().toPromise();
  }

  private setNewLoadedPromise(newLoadedPromise: Promise<T>): Promise<T> {
    this.previousLoadedPromise = this.loadedPromise;
    this.loadedPromise = newLoadedPromise;
    return this.loadedPromise;
  }

  private onLoadingObserver(subscription: ILoaderSubsctiption<T>): Promise<void> {
    return subscription.onLoading()
  }

  private onLoading(): Promise<void> {
    this.isLoading = true
    return Promise.all(this.subscriptions.map((subscription: ILoaderSubsctiption<T>) => {
      return subscription.onLoading()
    })).then(() => Promise.resolve());
  }

  private onLoadedSuccess(): Promise<void> {
    return this.onLoaded(true);
  }

  private onLoadedFail(error: any): Promise<void> {
    return this.onLoaded(false).then(() => Promise.reject(error));
  }

  private onLoaded(success: boolean): Promise<void> {
    this.isLoading = false;
    return Promise.all(this.subscriptions.map((subscription: ILoaderSubsctiption<T>) => {
      return this.onLoadedObserver(subscription, success)
    })).then(() => Promise.resolve());
  }

  private onLoadedObserverSuccess(subscription: ILoaderSubsctiption<T>): Promise<void> {
    return this.onLoadedObserver(subscription, true);
  }

  private onLoadedObserverFail(subscription: ILoaderSubsctiption<T>, error?: any): Promise<void> {
    return this.onLoadedObserver(subscription, false).then(() => error ? Promise.reject(error) : Promise.resolve());
    // here we do not throw the error, because it has already been handled (this method only gets called when subscribing)
  }

  private onLoadedObserver(subscription: ILoaderSubsctiption<T>, success: boolean): Promise<void> {
    return subscription.onLoaded(success)
  }

  private onUnload(): Promise<void> {
    return Promise.all(this.subscriptions.map((subscription: ILoaderSubsctiption<T>) => {
      return subscription.onUnload()
    })).then(() => Promise.resolve());
  }

  private check(valueChange: Promise<T>): Promise<void> {
    if (valueChange) return Promise.resolve();
    else return Promise.reject(new NoValueChangeError());
  }

  private catchCheck(error: any): Promise<void> {
    if (error instanceof NoValueChangeError) return Promise.resolve();
    else return Promise.reject(error)
  }

  private catchCheckObserver(subscription: ILoaderSubsctiption<T>, error: any): Promise<void> {
    if (error instanceof NoValueChangeError) return this.onLoadedObserverFail(subscription);
    else return Promise.reject(error)
  }
}

class NoValueChangeError extends Error { constructor() { super('There is no value change!') } }

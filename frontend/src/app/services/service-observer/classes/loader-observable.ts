import { ILoaderObservable } from '../interfaces/service-observable.interface';
import { ServiceObservable } from './service-observable';
import { ILoaderSubsctiption } from '../interfaces/service-subscription.interface';
import { ILoaderObserver } from '../interfaces/service-observer.interface';
import { Observable } from 'rxjs';

export abstract class LoaderObservable<Input, Output> extends ServiceObservable<Output> implements ILoaderObservable<Input, Output> {

  private isLoading: boolean = false;

  public abstract getSource(): Observable<Input>;
  public abstract setSource(source: Observable<Input>): Promise<Observable<Input>>;
  public abstract resetSource(): Promise<void>;
  protected abstract postProcess(loadedPromise: Promise<Input>): Promise<Output>;

  subscriptions: Array<ILoaderSubsctiption<Input, Output>>;
  protected loadedPromise: Promise<Input>;
  protected previousLoadedPromise: Promise<Input>;

  public subscribe(observer: ILoaderObserver<Input, Output>, handleError?: (error: any) => void): Promise<ILoaderSubsctiption<Input, Output>> {
    return (super.subscribe(observer) as Promise<ILoaderSubsctiption<Input, Output>>)
    .then((subscription: ILoaderSubsctiption<Input, Output>) => this.loadAndReturnSubscription(subscription, handleError))
    .then((subscription: ILoaderSubsctiption<Input, Output>) => Promise.resolve(subscription))
  }

  private loadAndReturnSubscription(subscription: ILoaderSubsctiption<Input, Output>, handleError?: (error: any) => void): Promise<ILoaderSubsctiption<Input, Output>> {
    return this.loadSubscription(subscription)
    .then(() => Promise.resolve(subscription))
    .catch((error: any) => {handleError(error); return Promise.resolve(subscription)});
  }

  public unsubscribe(subscription: ILoaderSubsctiption<Input, Output>): Promise<ILoaderSubsctiption<Input, Output>> {
    if (this.isLoading) return Promise.reject(new Error('Tried to unsubscribe whilst loading!'))
    return super.unsubscribe(subscription) as Promise<ILoaderSubsctiption<Input, Output>>;
  }

  public load(): Promise<void> {
    return this.onLoading()
    .then(() => this.loadAndSavePromise())
    .then(() => this.check(this.loadedPromise))
    .then(() => this.notifyObservers(this.postProcess(this.loadedPromise)))
    .then(() => this.onLoadedSuccess())
    .catch((error: any) => this.catchCheck(error))
    .catch((error: any) => this.notifyObserversFail(error))
    .catch((error: any) => this.onLoadedFail(error))
    .then(() => Promise.resolve());
  }

  private loadSubscription(subscription: ILoaderSubsctiption<Input, Output>): Promise<void> {
    return this.onLoadingObserver(subscription)
    .then(() => this.check(this.loadedPromise))
    .then(() => this.notifyObserver(subscription, this.postProcess(this.loadedPromise)))
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

  private loadAndSavePromise(): Promise<Input> {
    return this.setNewLoadedPromise(this.loadPromise())
  }

  protected loadPromise(): Promise<Input> {
    return this.getSource().toPromise();
  }

  private setNewLoadedPromise(newLoadedPromise: Promise<Input>): Promise<Input> {
    this.previousLoadedPromise = this.loadedPromise;
    this.loadedPromise = newLoadedPromise;
    return this.loadedPromise;
  }

  private onLoadingObserver(subscription: ILoaderSubsctiption<Input, Output>): Promise<void> {
    return subscription.onLoading()
  }

  private onLoading(): Promise<void> {
    this.isLoading = true
    return Promise.all(this.subscriptions.map((subscription: ILoaderSubsctiption<Input, Output>) => {
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
    return Promise.all(this.subscriptions.map((subscription: ILoaderSubsctiption<Input, Output>) => {
      return this.onLoadedObserver(subscription, success)
    })).then(() => Promise.resolve());
  }

  private onLoadedObserverSuccess(subscription: ILoaderSubsctiption<Input, Output>): Promise<void> {
    return this.onLoadedObserver(subscription, true);
  }

  private onLoadedObserverFail(subscription: ILoaderSubsctiption<Input, Output>, error?: any): Promise<void> {
    return this.onLoadedObserver(subscription, false).then(() => error ? Promise.reject(error) : Promise.resolve());
    // here we do not throw the error, because it has already been handled (this method only gets called when subscribing)
  }

  private onLoadedObserver(subscription: ILoaderSubsctiption<Input, Output>, success: boolean): Promise<void> {
    return subscription.onLoaded(success)
  }

  private onUnload(): Promise<void> {
    return Promise.all(this.subscriptions.map((subscription: ILoaderSubsctiption<Input, Output>) => {
      return subscription.onUnload()
    })).then(() => Promise.resolve());
  }

  private check(valueChange: Promise<Input>): Promise<void> {
    if (valueChange) return Promise.resolve();
    else return Promise.reject(new NoValueChangeError());
  }

  private catchCheck(error: any): Promise<void> {
    if (error instanceof NoValueChangeError) return Promise.resolve();
    else return Promise.reject(error)
  }

  private catchCheckObserver(subscription: ILoaderSubsctiption<Input, Output>, error: any): Promise<void> {
    if (error instanceof NoValueChangeError) return this.onLoadedObserverFail(subscription);
    else return Promise.reject(error)
  }
}

class NoValueChangeError extends Error { constructor() { super('There is no value change!') } }

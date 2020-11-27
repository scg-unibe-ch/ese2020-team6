import { Observable, Subscription, empty } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  ISubscription,
  LoaderSuccessSubscription,
  LoaderFailSubscription } from './loader-subscription.interface';
import {
  ILoader,
  ILoaderSuccessObserver,
  ILoaderFailObserver } from './loader-observer.interface';

export abstract class LoaderObservable<T> {

  private successSubscriptions: Array<LoaderSuccessSubscription<T>> = new Array<LoaderSuccessSubscription<T>>();
  private failSubscriptions: Array<LoaderFailSubscription> = new Array<LoaderFailSubscription>();

  private successValue: T;
  private failError: any;
  private isSuccess: boolean = false;
  private isFail: boolean = false;

  public forceUpdate(): void {
    this.loading();
    if (this.isFail && !this.isSuccess) this.success();
    if (!this.isFail && this.isSuccess) this.fail();
    this.loaded();
  }

  public load(): void {
    this.loading();
    try {
      this.buildObservable().pipe(catchError((error: any) => {
        this.failError = error;
        this.fail();
        return empty();
      })).subscribe((value: T) => {
        this.successValue = value;
        this.success();
      });
    } catch (error) {
      this.failError = error;
      this.fail();
    }
  }

  protected abstract buildObservable(): Observable<T>;

  private loading(): void {
    (this.successSubscriptions as Array<ILoader>)
    .forEach((loader: ILoader) => {
      loader.onLoading();
    });
  }

  private loaded(): void {
    (this.successSubscriptions as Array<ILoader>)
    .forEach((loader: ILoader) => {
      loader.onLoaded();
    });
  }

  private success(): void {
    this.isFail = false;
    this.isSuccess = true;
    this.notifyObservers<T>(this.successSubscriptions, this.successValue);
    this.loaded();
  }
  private fail(): void {
    this.isFail = true;
    this.isSuccess = false;
    this.notifyObservers<any>(this.failSubscriptions, this.failError);
    this.loaded();
  }

  private notifyObservers<S>(subscriptions: Array<ISubscription<S>>, value: S): void {
    subscriptions.forEach((subscription: ISubscription<S>) => {
      this.notifyObserver<S>(subscription, value);
    });
  }

  private notifyObserver<S>(subscription: ISubscription<S>, value: S) {
    if(LoaderObservable.checkValue(value)) subscription.notify(value);
  }

  public subscribeOnSuccess(observer: ILoaderSuccessObserver<T>): LoaderSuccessSubscription<T> {
    let successSubscription: LoaderSuccessSubscription<T> = new LoaderSuccessSubscription(this, observer);
    this.successSubscriptions.push(successSubscription);
    this.notifyObserver<T>(successSubscription, this.successValue);
    return successSubscription;
  }

  public subscribeOnFail(observer: ILoaderFailObserver): LoaderFailSubscription {
    let failSubscription: LoaderFailSubscription = new LoaderFailSubscription(this, observer);
    this.failSubscriptions.push(failSubscription);
    this.notifyObserver<any>(failSubscription, this.failError);
    return failSubscription;
  }

  private static checkValue(value: any): boolean {
    if (value == null || value === null || typeof value === 'undefined') return false;
    else return true;
  }
}

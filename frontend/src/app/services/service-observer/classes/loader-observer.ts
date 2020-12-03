import { ILoaderObservable } from "../interfaces/service-observable.interface";
import { ILoaderSubsctiption } from "../interfaces/service-subscription.interface";
import { ILoaderObserver } from "../interfaces/service-observer.interface";
import { LoaderSubsctiption } from "./loader-subscription";
import { ServiceObserver } from "./service-observer";

export abstract class LoaderObserver<T> extends ServiceObserver<T> implements ILoaderObserver<T>  {
  public abstract onSuccess: (value: T) => void;
  public abstract onFail: (error: any) => void;
  public abstract onLoading: () => void;
  public abstract onLoaded: (success: boolean) => void;
  public abstract onUnload: () => void;
  public abstract onUnloadCascade: ILoaderObservable<any>;
  public buildSubscription(observable: ILoaderObservable<T>): ILoaderSubsctiption<T> {
    return new LoaderSubsctiption(this, observable);
  }
}

export class EmptyLoader<T> extends LoaderObserver<T> {
  public onSuccess: (value: T) => void = () => {};
  public onFail: (error: any) => void = () => {};
  public onLoading: () => void = () => {};
  public onLoaded: (success: boolean) => void = () => {};
  public onUnload: () => void = () => {};
  public onUnloadCascade: ILoaderObservable<any>;
}

export class SuccessLoader<T> extends EmptyLoader<T> {
  constructor(public onSuccess: (value: T) => void) { super(); }
}
export class FailLoader<T> extends EmptyLoader<T> {
  constructor(public onFail: (error: any) => void) { super(); }
}
export class LoadingLoader<T> extends EmptyLoader<T> {
  constructor(public onLoading: () => void) { super(); }
}
export class LoadedLoader<T> extends EmptyLoader<T> {
  constructor(public onLoaded: (success: boolean) => void) { super(); }
}
export class ValueLoader<T> extends EmptyLoader<T> {
  constructor(
    public onSuccess: (value: T) => void,
    public onFail: (error: any) => void
  ) { super(); }
}
export class PartialLoader<T> extends EmptyLoader<T> {
  constructor(
    public onLoading: () => void,
    public onLoaded: (success: boolean) => void
  ) { super(); }
}

export class Unloader<T> extends EmptyLoader<T> {
  constructor(
    public onUnload: () => void
  ) { super(); }
}

export class Loader<T> extends EmptyLoader<T> {
  constructor(
    public onLoading: () => void,
    public onLoaded: (success: boolean) => void,
    public onUnload: () => void
  ) { super(); }
}

export class ValuePartialLoader<T> extends EmptyLoader<T> {
  constructor(
    public onSuccess: (value: T) => void,
    public onFail: (error: any) => void,
    public onLoading: () => void,
    public onLoaded: (success: boolean) => void
  ) { super(); }
}

export class ValueUnloader<T> extends EmptyLoader<T> {
  constructor(
    public onSuccess: (value: T) => void,
    public onFail: (error: any) => void,
    public onUnload: () => void
  ) { super(); }
}

export class ValueUnloaderCascade<T> extends EmptyLoader<T> {
  constructor(
    public onSuccess: (value: T) => void,
    public onFail: (error: any) => void,
    public onUnloadCascade: ILoaderObservable<any>
  ) {
    super();
    this.onUnload = () => this.onUnloadCascade.unload();
  }
}

export class FullLoader<T> extends EmptyLoader<T> {
  constructor(
    public onSuccess: (value: T) => void,
    public onFail: (error: any) => void,
    public onLoading: () => void,
    public onLoaded: (success: boolean) => void,
    public onUnload: () => void
  ) { super(); }
}

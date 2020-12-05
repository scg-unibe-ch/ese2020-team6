import { ILoaderObservable } from "../interfaces/service-observable.interface";
import { ILoaderSubsctiption } from "../interfaces/service-subscription.interface";
import { ILoaderObserver } from "../interfaces/service-observer.interface";
import { LoaderSubsctiption } from "./loader-subscription";
import { ServiceObserver } from "./service-observer";

export abstract class LoaderObserver<S, T> extends ServiceObserver<T> implements ILoaderObserver<S, T>  {
  public abstract onSuccess: (value: T) => void;
  public abstract onFail: (error: any) => void;
  public abstract onLoading: () => void;
  public abstract onLoaded: (success: boolean) => void;
  public abstract onUnload: () => void;
  public abstract onUnloadCascade: ILoaderObservable<any, any>;
  public buildSubscription(observable: ILoaderObservable<S, T>): ILoaderSubsctiption<S, T> {
    return new LoaderSubsctiption(this, observable);
  }
}

export class EmptyLoader<S, T> extends LoaderObserver<S, T> {
  public onSuccess: (value: T) => void = () => {};
  public onFail: (error: any) => void = () => {};
  public onLoading: () => void = () => {};
  public onLoaded: (success: boolean) => void = () => {};
  public onUnload: () => void = () => {};
  public onUnloadCascade: ILoaderObservable<any, any>;
}

export class SuccessLoader<S, T> extends EmptyLoader<S, T> {
  constructor(public onSuccess: (value: T) => void) { super(); }
}
export class FailLoader<S, T> extends EmptyLoader<S, T> {
  constructor(public onFail: (error: any) => void) { super(); }
}
export class LoadingLoader<S, T> extends EmptyLoader<S, T> {
  constructor(public onLoading: () => void) { super(); }
}
export class LoadedLoader<S, T> extends EmptyLoader<S, T> {
  constructor(public onLoaded: (success: boolean) => void) { super(); }
}
export class ValueLoader<S, T> extends EmptyLoader<S, T> {
  constructor(
    public onSuccess: (value: T) => void,
    public onFail: (error: any) => void
  ) { super(); }
}
export class PartialLoader<S, T> extends EmptyLoader<S, T> {
  constructor(
    public onLoading: () => void,
    public onLoaded: (success: boolean) => void
  ) { super(); }
}

export class Unloader<S, T> extends EmptyLoader<S, T> {
  constructor(
    public onUnload: () => void
  ) { super(); }
}

export class Loader<S, T> extends EmptyLoader<S, T> {
  constructor(
    public onLoading: () => void,
    public onLoaded: (success: boolean) => void,
    public onUnload: () => void
  ) { super(); }
}

export class ValuePartialLoader<S, T> extends EmptyLoader<S, T> {
  constructor(
    public onSuccess: (value: T) => void,
    public onFail: (error: any) => void,
    public onLoading: () => void,
    public onLoaded: (success: boolean) => void
  ) { super(); }
}

export class ValueUnloader<S, T> extends EmptyLoader<S, T> {
  constructor(
    public onSuccess: (value: T) => void,
    public onFail: (error: any) => void,
    public onUnload: () => void
  ) { super(); }
}

export class ValueUnloaderCascade<S, T> extends EmptyLoader<S, T> {
  constructor(
    public onSuccess: (value: T) => void,
    public onFail: (error: any) => void,
    public onUnloadCascade: ILoaderObservable<any, any>
  ) {
    super();
    this.onUnload = () => this.onUnloadCascade.unload();
  }
}

export class FullLoader<S, T> extends EmptyLoader<S, T> {
  constructor(
    public onSuccess: (value: T) => void,
    public onFail: (error: any) => void,
    public onLoading: () => void,
    public onLoaded: (success: boolean) => void,
    public onUnload: () => void
  ) { super(); }
}

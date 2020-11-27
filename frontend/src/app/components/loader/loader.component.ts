import { Component, Input } from '@angular/core';
import { LoaderObservable } from '../../services/loader-observable.interface';
import { ILoaderObserver } from '../../services/loader-observer.interface';
import { LoaderSuccessSubscription, LoaderFailSubscription } from '../../services/loader-subscription.interface';


@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements ILoaderObserver<any> {

  public successSubscription: LoaderSuccessSubscription<any>;
  public failSubscription: LoaderFailSubscription;

  private _loaded: boolean = false;
  private _loading: boolean = true;
  private _fail: boolean = false;
  private _success: boolean = true;
  private _loader: LoaderObservable<any>;

  @Input()
  set loader(loader: LoaderObservable<any>) {
    this._loader = loader;
    this.successSubscription = loader.subscribeOnSuccess(this);
    this.failSubscription = loader.subscribeOnFail(this);
  }

  public onSuccess(value: any): void {
    this._fail = false;
    this._success = true;
  }
  public onFail(error: any): void {
    this._fail = true;
    this._success = false;
  }
  public onLoading(): void {
    this._loaded = false;
    this._loading = true;
  }
  public onLoaded(): void {
    this._loaded = true;
    this._loading = false;
  }

  get loading(): boolean { return this._loading }
  get loaded(): boolean { return this._loaded }
  get fail(): boolean { return this._fail }
  get success(): boolean { return this._success }

}

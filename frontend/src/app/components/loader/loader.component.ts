import { Component, Input } from '@angular/core';
import { ValuePartialLoader, LoaderObservable } from '../../services/service.module';

@Component({
  selector: 'loader',
  templateUrl: './loader.component.html'
})
export class LoaderComponent {


  private _loaded: boolean = false;
  private _loading: boolean = true;
  private _fail: boolean = false;
  private _success: boolean = true;

  @Input()
  set loader(loader: LoaderObservable<any>) {
    loader.subscribe(this.fullLoader)
  }

  public onSuccess = () => {
    this._fail = false;
    this._success = true;
  }
  public onFail = () => {
    this._fail = true;
    this._success = false;
  }
  public onLoading = () => {
    this._loaded = false;
    this._loading = true;
  }
  public onLoaded = (success: boolean) => {
    /*  Uncomment the follwoing and comment out the next four lines of code
        for a demo of the loader. */
    /*
    setTimeout(()=>{
      this._loaded = true;
      this._loading = false;
      this._success = success;
      this._fail = !success
    }, 2000)*/
    this._loaded = true;
    this._loading = false;
    this._success = success;
    this._fail = !success
  }

  private fullLoader = new ValuePartialLoader(
    this.onSuccess,
    this.onFail,
    this.onLoading,
    this.onLoaded
  )

  get loading(): boolean { return this._loading }
  get loaded(): boolean { return this._loaded }
  get fail(): boolean { return this._fail }
  get success(): boolean { return this._success }

}

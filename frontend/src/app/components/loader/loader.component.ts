import { Component, Input } from '@angular/core';
import { ValuePartialLoader, LoaderObservable } from '../../services/service.module';

@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {


  public loaded: boolean = false;
  public loading: boolean = true;
  public fail: boolean = false;
  public success: boolean = true;

  @Input()
  set loader(loader: LoaderObservable<any, any>) {
    loader.subscribe(this.fullLoader)
  }

  public onSuccess = () => {
    this.fail = false;
    this.success = true;
  }
  public onFail = () => {
    this.fail = true;
    this.success = false;
  }
  public onLoading = () => {
    this.loaded = false;
    this.loading = true;
  }
  public onLoaded = (success: boolean) => {
    this.loaded = true;
    this.loading = false;
    if (!success) {
      this.onFail();
    }
  }

  private fullLoader = new ValuePartialLoader(
    this.onSuccess,
    this.onFail,
    this.onLoading,
    this.onLoaded
  )

}

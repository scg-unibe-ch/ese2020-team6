import { Component, Input } from '@angular/core';
import { OnLoad } from '../../services/on-load';

@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {

  public _loaded: boolean = false;
  private _loader: OnLoad<any>;

  @Input()
  set loader(loader: OnLoad<any>) {
    this._loader = loader;
    this.setUpLoader();
  }

  private setUpLoader(): void {
    // to show loader uncomment following line and comment out the other one:
    // this._loader.events.onLoad(() => setTimeout(() => this._loaded = true, 1000));
    this._loader.events.onLoad(() => this._loaded = true);
  }

  get loading(): boolean {
    return !this._loaded
  }

  get loaded(): boolean {
    return this._loaded
  }

}

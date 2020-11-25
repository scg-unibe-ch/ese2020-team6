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
    this._loader.events.onLoad(() => setTimeout(() => this._loaded = true,2000));
  }

  get loading(): boolean {
    return !this._loaded
  }

  get loaded(): boolean {
    return this._loaded
  }

}

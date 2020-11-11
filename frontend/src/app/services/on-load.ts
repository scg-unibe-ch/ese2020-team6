import { OnObservalbeEvents } from './on-observable-events';
import { Observable } from 'rxjs';

export abstract class OnLoad<T> extends OnObservalbeEvents<T> {

  private onLoad: string = 'onLoad';

  constructor() {
    super();
    this.addEvent(this.onLoad);
  }

  public load(): void {
    this.observables[this.onLoad] = this.loadObservable();
    this.addSubscriptions(this.onLoad);
  }

  protected abstract loadObservable(): Observable<T>;
}

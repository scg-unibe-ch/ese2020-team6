import { OnObservalbeEvents } from './on-observable-events';
import { Observable } from 'rxjs';

export abstract class OnLoad<T> extends OnObservalbeEvents {

  private onLoadEventName: string = 'onLoad';

  constructor() {
    super();
    this.addEvent(this.onLoadEventName);
  }

  public load(): OnLoad<T> {
    this.setObservable<T>(this.onLoadEventName, this.loadObservable());
    return this;
  }

  protected abstract loadObservable(): Observable<T>;
}

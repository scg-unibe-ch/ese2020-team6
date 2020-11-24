import { OnLoad } from './on-load';
import { Observable } from 'rxjs';

export abstract class OnUpdate<T> extends OnLoad<T> {

  private onUpdateEventName: string = 'onUpdate';

  constructor() {
    super();
    this.addEvent(this.onUpdateEventName);
  }

  public update(value: T): OnUpdate<T> {
    this.setObservable<T>(this.onUpdateEventName, this.updateObservable(value));
    return this;
  }

  protected abstract updateObservable(value: T): Observable<T>;
}

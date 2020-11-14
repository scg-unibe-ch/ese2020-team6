import { OnLoad } from './on-load';
import { Observable } from 'rxjs';

export abstract class OnUpdate<T> extends OnLoad<T> {

  private onUpdate: string = 'onUpdate';

  constructor() {
    super();
    this.addEvent(this.onUpdate);
  }

  public update(value: T): void {
    this.observables[this.onUpdate] = this.updateObservable(value);
    this.addSubscriptions(this.onUpdate);
  }

  protected abstract updateObservable(value: T): Observable<T>;
}

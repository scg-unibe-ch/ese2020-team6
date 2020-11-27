import { OnObservalbeEvents, Event} from './on-observable-events';
import { Observable, of, empty } from 'rxjs';
import { catchError, isEmpty, finalize } from 'rxjs/operators';
import { success, error } from '../models/operator/operators.module';

export abstract class OnLoad<T> extends OnObservalbeEvents {

  public onLoadEventName: string = 'onLoad';
  public onDidLoadEventName: string = 'onDidLoad';

  private nextLoaders: Array<OnLoad<any>> = new Array<OnLoad<any>>();

  constructor() {
    super();
    this.addEvent(this.onLoadEventName);
    this.addEvent(this.onDidLoadEventName);
  }

  protected load(): OnLoad<T> {
    let loadObservable: Observable<T> = this.loadObservable().pipe(
      success(() => this.didLoad(true)),
      catchError((error: any) => {
        this.didLoad(false)
        return empty();
      })
    );
    this.setObservable<T>(this.onLoadEventName, loadObservable);
    return this;
  }

  private loadNextLoaders(): OnLoad<T> {
    this.nextLoaders.forEach((loader: OnLoad<any>) => {
      console.log(loader, this);

      loader.load();
    });
    return this;
  }

  private addNextLoader(next: OnLoad<any>): OnLoad<T> {
    this.nextLoaders.push(next);
    return this;
  }

  public loadOn(event: Event): OnLoad<T>;
  public loadOn(loader: OnLoad<any>): OnLoad<T>;
  public loadOn(loaderOrEvent: Event | OnLoad<any>): OnLoad<T> {
    return typeof loaderOrEvent === 'function' ?
      this.loadOnEvent(loaderOrEvent as Event) :
      this.loadOnLoader(loaderOrEvent as OnLoad<any>);
  }

  private loadOnEvent(event: Event): OnLoad<T> {
    event(null, () => this.didLoad(false), () => this.load())
    return this;
  }

  private loadOnLoader(loader: OnLoad<any>): OnLoad<T> {
    loader.events.onLoad(null, () => this.didLoad(false), () => this.load())
    return this;
  }

  private didLoad(didLoad: boolean): OnLoad<T> {
    this.setObservable<boolean>(this.onDidLoadEventName, of(didLoad));
    return this;
  }

  protected abstract loadObservable(): Observable<T>;
}

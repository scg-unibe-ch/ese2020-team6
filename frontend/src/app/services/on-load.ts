import { OnObservalbeEvents, Event} from './on-observable-events';
import { Observable, of, empty } from 'rxjs';
import { catchError, isEmpty } from 'rxjs/operators';

export abstract class OnLoad<T> extends OnObservalbeEvents {

  private onLoadEventName: string = 'onLoad';
  private onDidLoadEventName: string = 'onDidLoad';

  constructor() {
    super();
    this.addEvent(this.onLoadEventName);
    this.addEvent(this.onDidLoadEventName);
  }

  protected load(): OnLoad<T> {
    let loadObservable: Observable<T> = this.loadObservable()
    .pipe(catchError((error: any) => {
      this.dontLoad();
      return empty();
    }));

    this.setObservable<T>(this.onLoadEventName, loadObservable);
    this.events.onLoad(() => this.didLoad(true));
    return this;
  }

  private dontLoad(): OnLoad<T> {
    this.setObservable<T>(this.onLoadEventName, empty());
    this.didLoad(false);
    return this;
  }

  public loadOn(event: Event): OnLoad<T>;
  public loadOn(loader: OnLoad<any>): OnLoad<T>;
  public loadOn(loaderOrEvent: Event | OnLoad<any>): OnLoad<T> {
    if (typeof loaderOrEvent === 'function') {
      let event: Event = loaderOrEvent as Event;
      event(null, () => this.dontLoad(), () => this.load());
    } else if (loaderOrEvent as OnLoad<any> !== this) {
      let loader: OnLoad<any> = loaderOrEvent as OnLoad<any>;
      loader.events.onDidLoad((didLoad: boolean) => {
        if (didLoad) this.load();
        else this.dontLoad();
      })
    }
    return this;
  }

  private didLoad(didLoad: boolean): OnLoad<T> {
    this.setObservable<boolean>(this.onDidLoadEventName, of(didLoad));
    return this;
  }

  protected abstract loadObservable(): Observable<T>;
}

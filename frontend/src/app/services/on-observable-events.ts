import { Observable, Subscription } from 'rxjs';
import { Subscriber, SuccSubscriber, ErrSubscriber } from './subscriber';

export class OnObservalbeEvents<T> {
  protected observables: Record<any, Observable<T>> = {};

  private subscribers: Record<any, Array<Subscriber<T>>> = {};
  private subscriptions: Record<any, Array<Subscription>> = {};

  public addEvent(name: string) {
    this.subscribers[name] = new Array<Subscriber<T>>();
    this.observables[name] = new Observable<T>();
    this.subscriptions[name] = new Array<Subscription>();
  }

  public addEvents(...names: Array<string>) {
    names.forEach((name: string) => {
      this.addEvent(name);
    });
  }

  public onEvent(name: string, succSubscriber: SuccSubscriber<T>, errSubscriber?: ErrSubscriber): void {
    this.subscribers[name].push({
      succSubscriber: succSubscriber,
      errSubscriber: errSubscriber
    });

    this.addSubscriptions(name);
  }

  protected addSubscriptions(name: string): void {

    let subscribers: Array<Subscriber<T>> = this.subscribers[name];
    let observable: Observable<T> = this.observables[name];
    let subscriptions: Array<Subscription> = this.subscriptions[name];

    this.resetSubscriptions(name);
    if (observable) {
      subscribers.forEach((subscriber: Subscriber<T>) => {
        subscriptions.push(this.observables[name].subscribe(subscriber.succSubscriber, subscriber.errSubscriber));
      });
    }
  }

  protected resetSubscriptions(name: string): void {
    let subscriptions: Array<Subscription> = this.subscriptions[name];
    subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }
}

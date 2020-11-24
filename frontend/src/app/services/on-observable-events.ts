import { Observable, Subscriber, NextObserver, ErrorObserver, CompletionObserver, Subscription, PartialObserver } from 'rxjs';
import {
  NextMethod,
  ErrorMethod,
  CompletionMethod } from './subscriber';

export class OnObservalbeEvents {
  private observers: Record<any, Array<PartialObserver<any>>> = {};
  private observables: Record<any, Observable<any>> = {};
  private subscriptions: Record<any, Subscription> = {};
  public events: Record<any, <T>(subscriberOrNext?: PartialObserver<T> | NextMethod<T>, error?: ErrorMethod, complete?: CompletionMethod) => void> = {};
  public getObservable: Record<any, <T>() => Observable<T>> = {};

  public addEvent<T>(eventName: string) {
    this.events[eventName] = <T>(subscriberOrNext?: PartialObserver<T> | NextMethod<T>, error?: ErrorMethod, complete?: CompletionMethod) => {
      let observer: PartialObserver<T>;
      if (typeof subscriberOrNext === 'function') {
        observer = { next: subscriberOrNext as NextMethod<T>, error: error, complete: complete };
      } else {
        observer =  subscriberOrNext as PartialObserver<T>;
      }
      this.addObserver(eventName, observer);
    }

    this.getObservable[eventName] = <T>() => {
      return this.getObservableForOneEvent(eventName);
    }
  }

  public reset(): void {
    this.resetAllSubscriptions()
    this.observers = {};
    this.observables = {};
    this.subscriptions = {};
    this.events = {};
  }

  public resetSubscriptions(...eventNames: Array<string>): void {
    eventNames.forEach((eventName: string) => {
      this.removeSubscriptionsForOneEvent(eventName);
    });
  }
  public resetAllSubscriptions(): void {
    Object.values(this.subscriptions).forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }
  public removeSubscriptionsForOneEvent(eventName: string): void {
    if (this.subscriptions[eventName]) this.subscriptions[eventName].unsubscribe();
  }


  /*
    Removes all observers for the specified names (events)
  */
  public resetObservers(...eventNames: Array<string>): void {
    eventNames.forEach((eventName: string) => {
      this.removeObserversForOneEvent(eventName);
    });
  }
  public resetAllObservers(): void {
    this.observers = {};
  }
  public removeObserversForOneEvent(eventName: string): void {
    while (this.observers[eventName].length > 0) {
      this.observers[eventName].pop();
    }
  }

  public getObservableForOneEvent<T>(eventName: string): Observable<T> {
    let observable: Observable<T> = this.observables[eventName];
    return observable ? observable : new Observable<T>();
  }

  public setObservable<T>(eventName: string, observable: Observable<T>): void {
    if (observable) {
      if (!this.observers[eventName]) this.observers[eventName] = new Array<PartialObserver<T>>();
      if (!this.subscriptions[eventName]) this.subscriptions[eventName] = new Subscription();
      if (this.observables[eventName]) this.removeObserversForOneEvent(eventName);

      let subscription: Subscription = this.subscriptions[eventName];
      this.observables[eventName] = observable;
      this.observers[eventName].forEach((observer: PartialObserver<T>) => {
        this.subscribeObserverToObservable(eventName, observer);
      });
    } else throw new Error('Observable cannot be null or undefined!')
  }

  private addObserver<T>(eventName: string, observer: PartialObserver<T>): void {
    if (!this.observers[eventName]) this.observers[eventName] = new Array<PartialObserver<T>>();
    if (!this.observers[eventName].includes(observer)) this.observers[eventName].push(observer);
    this.subscribeObserverToObservable(eventName, observer);
  }

  private subscribeObserverToObservable<T>(eventName: string, observer: PartialObserver<T>) {
    if (this.observables[eventName]) {
      this.subscriptions[eventName].add(this.observables[eventName].subscribe(observer));
    }
  }
}

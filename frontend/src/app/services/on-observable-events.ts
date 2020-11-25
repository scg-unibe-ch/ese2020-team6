import { Observable, Subscriber, NextObserver, ErrorObserver, CompletionObserver, Subscription, PartialObserver } from 'rxjs';
import {
  NextMethod,
  ErrorMethod,
  CompletionMethod } from './subscriber';

export class OnObservalbeEvents {

  public static catchError(err: any) {};

  private static observerId: number = 0;
  private observers: Record<any, Record<number, PartialObserver<any>>> = {};
  private subscriptions: Record<any, Record<number, Subscription>> = {};

  public observables: Record<any, Observable<any>> = {};
  public events: Record<any, <T>(subscriberOrNext?: PartialObserver<T> | NextMethod<T>, error?: ErrorMethod, complete?: CompletionMethod) => [number, Subscription]> = {};
  public removeObserverById: Record<any, (observerId: number) => void> = {}

  public addEvent<T>(eventName: string) {
    this.events[eventName] = <T>(subscriberOrNext?: PartialObserver<T> | NextMethod<T>, error?: ErrorMethod, complete?: CompletionMethod) => {
      let observer: PartialObserver<T>;
      if (typeof subscriberOrNext === 'function') {
        observer = {
          next: subscriberOrNext as NextMethod<T>,
          error: error,
          complete: complete
        };
      } else {
        observer =  subscriberOrNext as PartialObserver<T>;
      }
      return this.addObserver<T>(eventName, observer)[0];
    }
    this.observables[eventName] = new Observable<T>();

    this.subscriptions[eventName] = {};
    this.observers[eventName] = {};
    this.removeObserverById[eventName] = (observerId: number) => this.removeObserver(eventName, observerId);
  }

  public removeEvent<T>(eventName: string): Observable<T> {
    this.unsubscribeEvent(eventName);
    delete this.subscriptions[eventName];
    delete this.observers[eventName];
    delete this.events[eventName];
    let observable: Observable<T> = this.removeEventObservable(eventName);
    delete this.observables[eventName];
    delete this.removeObserverById[eventName];
    return observable;
  }

  public reset(): void {
    this.removeAllObservers();
    this.observables = {};
    this.subscriptions = {};
    this.events = {};
    this.removeObserverById = {};
  }


  /*
    Unsubscribe observers
  */
  private unsubscribeAll(): void {
    Object.values(this.subscriptions).forEach((subscriptionOnEvent: Record<number, Subscription>) => {
      Object.values(subscriptionOnEvent).forEach((subscription: Subscription) => {
        subscription.unsubscribe();
      });
    });
    this.subscriptions = {};
  }
  private unsubscribeEvent(eventNames: Array<string>): void;
  private unsubscribeEvent(eventNameOne: string, ...eventNames: Array<string>): void;
  private unsubscribeEvent(eventNamesOrOne: Array<string> | string, ...additionalEventNames: Array<string>): void {
    if (Array.isArray(eventNamesOrOne)) {
      eventNamesOrOne = eventNamesOrOne as Array<string>;
    } else if (typeof eventNamesOrOne === 'string') {
      eventNamesOrOne = [eventNamesOrOne] as Array<string>;
    }
    const eventNames: Array<string> = eventNamesOrOne.concat(additionalEventNames);
    this.doEventsExist(eventNames);
    eventNames.forEach((eventName: string) => {
      Object.values(this.subscriptions[eventName]).forEach((subscription: Subscription) => {
        subscription.unsubscribe();
      });
      this.subscriptions[eventName] = {};
    });
  }
  private unsubscribe(eventName: string, subscriptionId: number) {
    if (this.subscriptions[eventName][subscriptionId]) {
      this.subscriptions[eventName][subscriptionId].unsubscribe();
    }
    delete this.subscriptions[eventName][subscriptionId];
  }


  private subscribeAll(): void {
    this.subscribeEvent(Object.keys(this.observers));
  }
  private subscribeEvent(eventNames: Array<string>): void;
  private subscribeEvent(eventNameOne: string, ...eventNames: Array<string>): void;
  private subscribeEvent(eventNamesOrOne: Array<string> | string, ...additionalEventNames: Array<string>): void {
    if (Array.isArray(eventNamesOrOne)) {
      eventNamesOrOne = eventNamesOrOne as Array<string>;
    } else if (typeof eventNamesOrOne === 'string') {
      eventNamesOrOne = [eventNamesOrOne] as Array<string>;
    }
    const eventNames: Array<string> = eventNamesOrOne.concat(additionalEventNames);
    this.doEventsExist(eventNames);
    eventNames.forEach((eventName: string) => {
      Object.keys(this.observers[eventName]).forEach((observerId: string) => {
        this.subscribe(eventName, parseInt(observerId));
      })
    });
  }
  private subscribe(eventName: string, observerId: number) {
    let observer: PartialObserver<any> = this.observers[eventName][observerId];
    let observable: Observable<any> = this.observables[eventName]
    this.subscriptions[eventName][observerId] =  observable.subscribe(observer);
  }

  /*
    Removes observers
  */
  public removeAllObservers(): void {
    this.unsubscribeAll();
    this.observers = {};
  }
  public removeEventObservers(...eventNames: Array<string>): void {
    this.unsubscribeEvent(eventNames);
    eventNames.forEach((eventName: string) => {
      this.observers[eventName] = {};
    });
  }
  public removeObserver(eventName: string, observerId: number): void {
    this.unsubscribe(eventName, observerId);
    delete this.observers[eventName][observerId];
  }

  /*
    Add observer and subscribe
  */
  public addObserver<T>(eventName: string, ...observers: Array<PartialObserver<T>>): Array<[number, Subscription]> {
    let added: Array<[number, Subscription]> = new Array<[number, Subscription]>();
    observers.forEach((observer: PartialObserver<T>) => {
      this.observers[eventName][OnObservalbeEvents.observerId] = observer;
      let subscription: Subscription = this.observables[eventName].subscribe(observer);
      added.push([OnObservalbeEvents.observerId, subscription]);
      this.subscriptions[eventName][OnObservalbeEvents.observerId++] = subscription;
    });
    return added;
  }

  /*
    Handle Observables
  */

  public getObservable<T>(eventName: string): Observable<T> {
    return this.observables[eventName];
  }

  public setObservable<T>(eventName: string, observable: Observable<T>): void {
    if (observable) {
      this.unsubscribeEvent(eventName);
      this.observables[eventName] = observable;
      this.subscribeEvent(eventName);
    }
  }

  private removeEventObservable<T>(eventName: string): Observable<T> {
    this.unsubscribeEvent(eventName);
    let observable: Observable<T> = this.observables[eventName];
    this.observables[eventName] = new Observable<T>();
    return observable;
  }

  private doEventsExist(eventNames: Array<string>): void {
    eventNames.forEach((eventName: string) => {
      this.doesEventExist(eventName);
    });
  }

  private doesEventExist(eventName: string): void {
    if (!this.events[eventName]) throw new EventDoesNotExistError(eventName);
  };
}

class EventDoesNotExistError extends Error {
  constructor(eventName: string) {
    super('Event \"' + eventName + '\" does not exist!');
  }
}

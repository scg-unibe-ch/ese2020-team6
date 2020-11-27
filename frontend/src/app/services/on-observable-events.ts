import { Observable, Subscriber, NextObserver, ErrorObserver, CompletionObserver, Subscription, PartialObserver, empty, of } from 'rxjs';
import { isEmpty, defaultIfEmpty } from 'rxjs/operators';
import {
  NextMethod,
  ErrorMethod,
  CompletionMethod } from './subscriber';

export type Event = <T>(subscriberOrNext?: PartialObserver<T> | NextMethod<T>, error?: ErrorMethod, complete?: CompletionMethod) => [number, Subscription];

export class OnObservalbeEvents {

  public static catchError(err: any) {};

  private static observerId: number = 0;
  private observers: Record<any, Record<number, PartialObserver<any>>> = {};

  private observables: Record<any, Observable<any>> = {};
  public events: Record<any, Event> = {};
  public removeObserverById: Record<any, (observerId: number) => void> = {}

  public addEvent<T>(eventName: string) {
    this.events[eventName] = <T>(subscriberOrNext?: PartialObserver<T> | NextMethod<T>, error?: ErrorMethod, complete?: CompletionMethod) => {
      let observer: PartialObserver<T>;
      if (typeof subscriberOrNext === 'function' || !subscriberOrNext) {
        observer = {
          next: subscriberOrNext as NextMethod<T>,
          error: error,
          complete: complete
        };
      } else if (!subscriberOrNext && !error && !complete) {
        observer = {
          next: () => {}
        }
      } else {
        observer =  subscriberOrNext as PartialObserver<T>;
      }

      return this.addObserver<T>(eventName, observer)[0];
    }
    this.observables[eventName] = empty();

    this.observers[eventName] = {};
    this.removeObserverById[eventName] = (observerId: number) => this.removeObserver(eventName, observerId);
  }

  public removeEvent<T>(eventName: string): Observable<T> {
    delete this.observers[eventName];
    delete this.events[eventName];
    let observable: Observable<T> = this.removeObservable(eventName);
    delete this.observables[eventName];
    delete this.removeObserverById[eventName];
    return observable;
  }

  public reset(): void {
    this.removeAllObservers();
    this.observables = {};
    this.events = {};
    this.removeObserverById = {};
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
    let observable: Observable<any> = this.observables[eventName];
    observable.subscribe(
      new Subscriber(observer.next, observer.error, observer.complete)
    );
  }

  /*
    Removes observers
  */
  public removeAllObservers(): void {
    this.observers = {};
  }
  public removeEventObservers(...eventNames: Array<string>): void {
    eventNames.forEach((eventName: string) => {
      this.observers[eventName] = {};
    });
  }
  public removeObserver(eventName: string, observerId: number): void {
    delete this.observers[eventName][observerId];
  }

  /*
    Add observer and subscribe
  */
  public addObserver<T>(eventName: string, ...observers: Array<PartialObserver<T>>): Array<[number, Subscription]> {
    let added: Array<[number, Subscription]> = new Array<[number, Subscription]>();
    observers.forEach((observer: PartialObserver<T>) => {
      this.observers[eventName][OnObservalbeEvents.observerId] = observer;
      let subscription: Subscription = this.observables[eventName].subscribe(
        new Subscriber(observer.next, observer.error, observer.complete)
      );
      added.push([OnObservalbeEvents.observerId++, subscription]);
    });
    return added;
  }

  /*
    Handle Observables
  */

  public getObservable<T>(eventName: string): Observable<T> {
    return this.observables[eventName]
  }

  public setObservable<T>(eventName: string, observable: Observable<T>): void {
    if (observable) {
      this.observables[eventName] = observable;
      this.subscribeEvent(eventName);
    }
  }

  public removeObservable<T>(eventName: string): Observable<T> {
    let observable: Observable<T> = this.observables[eventName];
    this.observables[eventName] = empty();
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

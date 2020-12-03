import { Injectable } from '@angular/core';
import { LoaderObservable } from '../service.module';
import { Observable } from 'rxjs';
import { Threads } from 'src/app/models/message/threads.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService extends LoaderObservable<Threads> {

  constructor() {
    super();
  }



  public getSource(): Observable<Threads> {
    throw new Error("Method not implemented.");
  }
  public setSource(source: Observable<Threads>): Promise<Observable<Threads>> {
    throw new Error("Method not implemented.");
  }
  public resetSource(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

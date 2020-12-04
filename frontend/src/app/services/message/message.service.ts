import { Injectable } from '@angular/core';
import { LoaderObservable } from '../service.module';
import { Observable, of } from 'rxjs';
import { Threads } from 'src/app/models/message/threads.model';
import { UserService } from '../user/user.service';

import { threads } from './temp';

@Injectable({
  providedIn: 'root'
})
export class MessageService extends LoaderObservable<Threads> {

  private _source: Observable<Threads>;

  constructor(
    private userService: UserService
  ) {
    super();
    this.setSource(of(threads));
    this.load();
  }



  public getSource(): Observable<Threads> {
    return this._source;
  }
  public setSource(source: Observable<Threads>): Promise<Observable<Threads>> {
    return Promise.resolve(this._source = source);
  }
  public resetSource(): Promise<void> {
    return new Promise<void>(resolve => {
      this._source = undefined
      resolve();
    })
  }
}

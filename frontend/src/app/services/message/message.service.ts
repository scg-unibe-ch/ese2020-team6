import { Injectable } from '@angular/core';
import { LoaderObservable, ValueUnloaderCascade } from '../service.module';
import { Observable, of } from 'rxjs';
import { Threads } from 'src/app/models/message/threads.model';
import { UserService } from '../user/user.service';

import { threads } from './temp';
import { User } from 'src/app/models/user/user.model';
import { Message } from 'src/app/models/message/message.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { SendMessageRequest } from 'src/app/models/request/message/send/send-message-request.model';
import { RequestBuilder } from 'src/app/models/request/request-builder.interface';
import { MessageResponseModel } from 'src/app/models/response/response-model.module';
import { transformMessage } from 'src/app/models/operator/index.module';


@Injectable({
  providedIn: 'root'
})
export class MessageService extends LoaderObservable<Threads> {

  private _source: Observable<Threads>;

  private userSuccess = (user: User) => {
    this.setSource(of(threads));
    this.load()
  }

  private valueUnloaderCascade = new ValueUnloaderCascade(
    this.userSuccess,
    () => {},
    this
  )

  constructor(
    private userService: UserService,
    private httpClient: HttpClient
  ) {
    super();
    this.userService.subscribe(this.valueUnloaderCascade)
  }



  public getSource(): Observable<Threads> {
    // replace following line with request to backend
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

  public send(requestBuilder: RequestBuilder<SendMessageRequest>): Observable<Message> {
    return this.httpClient.post<MessageResponseModel>(environment.endpointURL + '/message/send', requestBuilder.request())
    .pipe(transformMessage());
  }
}

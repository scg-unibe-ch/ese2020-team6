import { Injectable } from '@angular/core';
import { LoaderObservable, ValueUnloaderCascade, ValueLoader } from '../service.module';
import { Observable } from 'rxjs';
import { Threads, NullThreads } from 'src/app/models/message/threads.model';
import { UserService } from '../user/user.service';

import { User } from 'src/app/models/user/user.model';
import { Message } from 'src/app/models/message/message.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { SendMessageRequest } from 'src/app/models/request/message/send/send-message-request.model';
import { RequestBuilder } from 'src/app/models/request/request-builder.interface';
import { MessageResponseModel } from 'src/app/models/response/response-model.module';
import { transformMessage, transformUser, transformAddress, transfromThread, transfromThreads, defaultEmpty } from 'src/app/models/operator/index.module';
import { NullCutUser, CutUser } from 'src/app/models/user/cut-user.model';


@Injectable({
  providedIn: 'root'
})
export class MessageService extends LoaderObservable<Threads, Threads> {

  private _source: Observable<Threads>;
  public loadedThreads: Threads = NullThreads.instance();
  private hasThreads: boolean = false;
  private currentSender: CutUser = NullCutUser.instance();

  private userSuccess = (user: User) => {
    this.currentSender = user.cutUser();
    this.getThreads()
    this.httpClient.get(environment.endpointURL + 'message/thread').pipe(transformUser(), transformAddress(), transformMessage(), transfromThread(), transfromThreads());
  }

  private valueUnloaderCascade = new ValueUnloaderCascade(
    this.userSuccess,
    () => {},
    this
  )

  private threadsSuccess = (threads: Threads) => {
    this.loadedThreads = threads;
    this.hasThreads = true;
  }
  private threadsFailure = (error: any) => {
    this.loadedThreads = undefined;
    this.hasThreads = false;
  }

  constructor(
    private userService: UserService,
    private httpClient: HttpClient
  ) {
    super();
    this.userService.subscribe(this.valueUnloaderCascade)
    this.subscribe(new ValueLoader(this.threadsSuccess, this.threadsFailure))
  }


  private getThreads(): void {
    if (!this.hasThreads) {
      this.sendRequest();
      this.load();
    } else this.load();
  }


  protected postProcess(threadsPromise: Promise<Threads>): Promise<Threads> {
    return threadsPromise.then((threads: Threads) => {
      let mergedThreads: Threads = this.loadedThreads.mergeAndRetreive(threads);
      mergedThreads.currentSender = this.currentSender;
      return Promise.resolve(mergedThreads);
    });
  }


  public send(requestBuilder: RequestBuilder<SendMessageRequest>): Observable<Message> {
    let message = this.httpClient.post<MessageResponseModel>(environment.endpointURL + 'message/send', requestBuilder.request())
    .pipe(transformMessage());
    message.subscribe(() => {
      this.hasThreads = false;
      this.getThreads();
    });
    return message;
  }

  private sendRequest(): void {
    let threadsRequestObservable = this.httpClient
    .get(environment.endpointURL + 'message/thread')
    .pipe(
      defaultEmpty(NullThreads.instance()), transformUser(), transformAddress(), transformMessage(),
      transfromThread(), transfromThreads()
    );
    this.setSource(threadsRequestObservable);
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
      this.loadedThreads = NullThreads.instance();
      this.currentSender = NullCutUser.instance();
      resolve();
    })
  }
}

import { Injectable } from '@angular/core';
import { LoaderObservable, ValueUnloaderCascade, ValueLoader } from '../service.module';
import { Observable } from 'rxjs';
import { Threads, NullThreads } from 'src/app/models/message/threads.model';
import { UserService } from '../user/user.service';

import { User } from 'src/app/models/user/user.model';
import { Message } from 'src/app/models/message/message.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { SendMessageRequest, ReadStatusRequest } from 'src/app/models/request/request.module';
import { RequestBuilder } from 'src/app/models/request/request-builder.interface';
import { MessageResponseModel, ThreadResponseModel, SimpleThreadResponseModel, CountResponseModel } from 'src/app/models/response/response.module';
import { transformMessage, transfromSimpleThread, transfromThread, transfromThreads, defaultEmpty, transformCount } from 'src/app/models/operator/index.module';
import { NullCutUser, CutUser } from 'src/app/models/user/cut-user.model';
import { Thread, SimpleThread } from 'src/app/models/message/thread.model';
import { share } from 'rxjs/operators';
import { Count } from 'src/app/models/count/count.model';


@Injectable({
  providedIn: 'root'
})
export class MessageService extends LoaderObservable<Threads, Threads> {

  private _source: Observable<Threads>;
  public loadedThreads: Threads = NullThreads.instance();
  private hasThreads: boolean = false;
  private currentSender: CutUser = NullCutUser.instance();
  public unreadCount: Observable<Count<SimpleThread>>;

  private userSuccess = (user: User) => {
    this.currentSender = user.cutUser();
    this.getThreads();
  }

  private valueUnloaderCascade = new ValueUnloaderCascade(
    this.userSuccess,
    () => {},
    this
  )

  private threadsSuccess = (threads: Threads) => {
    this.getUnreadCount();
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

  private updateThreads(): void {
    this.hasThreads = false;
    this.getThreads();
    this.getUnreadCount();
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
    .pipe(share(), transformMessage());
    message.subscribe(() => this.updateThreads());
    return message;
  }

  public setReadStatus(requestBuilder: RequestBuilder<ReadStatusRequest>): Observable<Thread> {
    let thread = this.httpClient.put<ThreadResponseModel>(environment.endpointURL + 'message/thread/readstatus', requestBuilder.request())
    .pipe(share(), transfromThread())
    thread.subscribe(() => this.updateThreads())
    return thread;
  }

  public getUnreadCount(): MessageService {
    this.unreadCount = this.httpClient.get<CountResponseModel<SimpleThreadResponseModel>>(environment.endpointURL + 'message/thread/unread/count')
    .pipe(share(), transfromSimpleThread(), transformCount<any, SimpleThread>())
    return this;
  }

  private sendRequest(): void {
    let threadsRequestObservable = this.httpClient
    .get(environment.endpointURL + 'message/thread')
    .pipe(defaultEmpty(NullThreads.instance()), transfromThreads());
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

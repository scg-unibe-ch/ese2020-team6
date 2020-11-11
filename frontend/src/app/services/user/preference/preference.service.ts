import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { UserService } from '../user.service';
import { UserModel, NullUser } from '../../../models/user/user.model';
import { PreferenceModel, NullPreference } from '../../../models/user/preference/preference.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PreferenceService {

  public preferencesObservable: Observable<PreferenceModel>;

  private loadSubcribers: Array<{
    subscriber: (preference: PreferenceModel) => void,
    errSubscriber?: (err: any) => void
  }> = new Array<{
    subscriber: (preference: PreferenceModel) => void,
    errSubscriber?: (err: any) => void
  }>();

  private updateSubcribers: Array<{
    subscriber: (preference: PreferenceModel) => void,
    errSubscriber?: (err: any) => void
  }> = new Array<{
    subscriber: (preference: PreferenceModel) => void,
    errSubscriber?: (err: any) => void
  }>();

  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) {
    this.userService.onLogin(() => {
      this.loadPreferences();
      this.addSubscriptions(this.loadSubcribers);
    });
  }

  public loadPreferences(): void {
    this.preferencesObservable = this.httpClient.get<PreferenceModel>(environment.endpointURL + 'user/preference/get').pipe(share());
  }

  public onLoad(subscriber: (preference: PreferenceModel) => void, errSubscriber?: (err: any) => void): void {
    this.loadSubcribers.push({
      subscriber: subscriber,
      errSubscriber: errSubscriber
    });
    this.addSubscriptions(this.loadSubcribers);
  }

  public getAllPreferences(): Observable<PreferenceModel> {
    return this.preferencesObservable;
  }

  public setPreferences(preferences: PreferenceModel): PreferenceService {
    this.preferencesObservable = this.httpClient.put<PreferenceModel>(environment.endpointURL + 'user/preference/set', preferences).pipe(share())
    return this;
  }

  public onUpdate(subscriber: (preference: PreferenceModel) => void, errSubscriber?: (err: any) => void): void {
    this.updateSubcribers.push({
      subscriber: subscriber,
      errSubscriber: errSubscriber
    });
    this.addSubscriptions(this.updateSubcribers)
  }



  private addSubscriptions(subscribers: Array<{
    subscriber: (preference: PreferenceModel) => void,
    errSubscriber?: (err: any) => void
  }>): void {
    if (this.preferencesObservable) {
      subscribers.forEach((subscriber: {
        subscriber: (preference: PreferenceModel) => void,
        errSubscriber?: (err: any) => void
      }) => this.preferencesObservable.subscribe(subscriber.subscriber, subscriber.errSubscriber));
    }
  }
}

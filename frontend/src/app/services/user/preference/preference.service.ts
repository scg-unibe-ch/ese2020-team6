import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { PreferenceModel } from '../../../models/user/preference/preference.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PreferenceService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public getPreferences(): Observable<PreferenceModel> {
    return this.httpClient.get<PreferenceModel>(environment.endpointURL + 'user/preference/get').pipe(share())
  }

  public setPreferences(): Observable<PreferenceModel> {
    let preferences: PreferenceModel = {
      theme: "dark"
    }
    return this.httpClient.put<PreferenceModel>(environment.endpointURL + 'user/preference/set', preferences).pipe(share())
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { UserService } from '../user.service';
import { PreferenceModel } from '../../../models/user/preference/preference.model';
import { environment } from '../../../../environments/environment';
import { OnUpdate } from '../../on-update';

@Injectable({
  providedIn: 'root'
})
export class PreferenceService {

  constructor(
    private userService: UserService,
    private httpClient: HttpClient
  ) {
  }

  protected loadObservable(): Observable<PreferenceModel> {
    return this.httpClient.get<PreferenceModel>(environment.endpointURL + 'user/preference/get').pipe(share());
  }

  protected updateObservable(value: PreferenceModel): Observable<PreferenceModel> {
    return this.httpClient.put<PreferenceModel>(environment.endpointURL + 'user/preference/set', value).pipe(share());
  }
}

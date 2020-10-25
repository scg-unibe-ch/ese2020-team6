import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { UserModel } from '../../../models/user/user.model';
import { CutUserModel } from '../../../models/user/cut-user.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetUserService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public getUserByIdSecured(userId: number): Observable<UserModel> {
    return this.httpClient.get<UserModel>(environment.endpointURL + 'user/userid:' + userId.toString()).pipe(share())
  }

  public getUserByIdUnsecured(userId: number): Observable<CutUserModel> {
    return this.httpClient.get<CutUserModel>(environment.endpointURL + 'user/userid:' + userId.toString()).pipe(share())
  }
}

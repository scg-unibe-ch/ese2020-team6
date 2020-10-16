//Packages
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
//Models
import { UserModel } from '../../../models/user/user.model';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetUserService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public getById(id: number): Observable<UserModel> {
    return this.httpClient.get<UserModel>(environment.endpointURL + 'user/userid:' + id.toString()).pipe(share())
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { share, map } from 'rxjs/operators';
import { UserModel, NullUser } from '../../../models/user/user.model';
import { CutUserModel, NullCutUser } from '../../../models/user/cut-user.model';
import { EndpointURLSegment } from '../../../models/endpoint/endpoint-url-segment';
import { GetService } from '../../get-service';
import { Address } from '../../../models/map/address/address.model';
import { transformAddress } from '../../../models/operator/address.operator';


@Injectable({
  providedIn: 'root'
})
export class GetUserService extends GetService {

  constructor(
    httpClient: HttpClient,
  ) {
    super('user/', httpClient);
  }

  public getUserByIdSecured(userId: number): Observable<UserModel> {
    if (userId) {
      return this.get<UserModel>('userid/' + userId.toString()).pipe(share(), transformAddress());
    } else { return of(new NullUser()); }
  }

  public getUserByIdUnsecured(userId: number): Observable<CutUserModel> {
    if (userId) {
      return this.get<CutUserModel>('userid/' + userId.toString()).pipe(share());
    } else { return of(new NullCutUser()); }
  }
}

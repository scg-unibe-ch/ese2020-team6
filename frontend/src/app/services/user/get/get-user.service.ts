import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { share } from 'rxjs/operators';
import { UserModel, User, NullUser } from '../../../models/user/user.model';
import { CutUserModel, NullCutUser } from '../../../models/user/cut-user.model';
import { GetService } from '../../get-service';
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
    } else { return of(NullUser.instance()); }
  }

  public getUserByIdUnsecured(userId: number): Observable<CutUserModel> {
    if (userId) {
      return this.get<CutUserModel>('userid/' + userId.toString()).pipe(share());
    } else { return of(NullCutUser.instance()); }
  }
}

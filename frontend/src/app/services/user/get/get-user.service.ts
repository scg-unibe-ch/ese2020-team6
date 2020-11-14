import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { share, map } from 'rxjs/operators';
import { UserModel } from '../../../models/user/user.model';
import { CutUserModel } from '../../../models/user/cut-user.model';
import { EndpointURLSegment } from '../../../models/endpoint/endpoint-url-segment';
import { GetService } from '../../get-service';
import { Address } from '../../../models/map/address/address.model';


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
    return this.get<UserModel>('userid/' + userId.toString()).pipe(share(), map((user: UserModel) => {
      user.address = Address.buildFromAddressModel(user.address);
      return user;
    }));
  }

  public getUserByIdUnsecured(userId: number): Observable<CutUserModel> {
    return this.get<CutUserModel>('userid/' + userId.toString()).pipe(share());
  }
}

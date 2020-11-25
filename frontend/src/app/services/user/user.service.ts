import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginUserService } from './login/login-user.service';
import { GetUserService } from './get/get-user.service';
import { UserModel } from '../../models/user/user.model';
import { CutUserModel } from '../../models/user/cut-user.model';
import { PreferenceModel } from '../../models/user/preference/preference.model';
import { Address } from '../../models/map/address/address.model';

import { OnLoad } from '../on-load';

@Injectable({
  providedIn: 'root'
})
export class UserService extends OnLoad<UserModel> {

  constructor(
    private loginUserService: LoginUserService,
    private getUserService: GetUserService
  ) {
    super();
    this.loginUserService.events.onLoad(() => {
      this.load()
    }, OnLoad.catchError)
  }

  public getUserById(userId: number): Observable<CutUserModel> {
    return this.getUserService.getUserByIdUnsecured(userId);
  }

  public getUserObservable(): Observable<UserModel> {
    return this.observables.onLoad;
  }

  protected loadObservable(): Observable<UserModel> {
    return this.loginUserService.getUserObservable();
  }
}

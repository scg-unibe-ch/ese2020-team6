import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginUserService } from './login/login-user.service';
import { GetUserService } from './get/get-user.service';
import { UserModel } from '../../models/user/user.model';
import { CutUserModel } from '../../models/user/cut-user.model';

import { OnLoad } from '../on-load';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private loginUserService: LoginUserService,
    private getUserService: GetUserService
  ) {

  }

  public getUserById(userId: number): Observable<CutUserModel> {
    return this.getUserService.getUserByIdUnsecured(userId);
  }

  public getUserObservable(): Observable<UserModel> {
    return null;
  }

  protected loadObservable(): Observable<UserModel> {
    return null;
  }
}

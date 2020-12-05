import { Injectable } from '@angular/core';
import { Observable, of, empty } from 'rxjs';
import { LoginUserService } from './login/login-user.service';
import { GetUserService } from './get/get-user.service';
import { UserModel, User } from '../../models/user/user.model';
import { CutUserModel } from '../../models/user/cut-user.model';
import { UserTokenModel } from 'src/app/models/response/user/login/login-user-response.model';
import { LoaderObservable, ValueUnloaderCascade } from '../service.module';
import { map } from 'rxjs/operators';
import { toUser } from 'src/app/models/operator/index.module';

@Injectable({
  providedIn: 'root'
})
export class UserService extends LoaderObservable<User, User> {

  private currentUser: User;
  private currentError: any;

  private loginSuccess = (login: UserTokenModel) => {
    this.currentError = undefined;
    this.loginToUserPromise(login)
    .then((user: User) => this.setCurrentUser(user))
    .then(() => this.load())
    .catch((error: any) => console.log("error in UserService"))
  }
  private loginFailure = (error: any) => this.currentError = error;
  private valueUnloaderCascade = new ValueUnloaderCascade(
    this.loginSuccess,
    this.loginFailure,
    this
  )

  constructor(
    private loginUserService: LoginUserService,
    private getUserService: GetUserService
  ) {
    super();
    this.loginUserService.subscribe(this.valueUnloaderCascade);
  }

  protected postProcess(loadedPromise: Promise<User>): Promise<User> {
    return loadedPromise;
  }

  public getUserById(userId: number): Observable<CutUserModel> {
    return this.getUserService.getUserByIdUnsecured(userId);
  }

  protected loadPromise(): Promise<User> {
    if (this.currentError) return Promise.reject(this.currentError)
    return Promise.resolve(this.currentUser);
  }

  private loginToUserPromise(login: UserTokenModel): Promise<User> {
    return Promise.resolve(User.buildFromUserModel(login.user));
  }

  private setCurrentUser(user: User): Promise<User> {
    this.currentUser = user;
    return Promise.resolve(user);
  }

  public isLoggedIn(): Observable<boolean> {
    return this.getSource().pipe(map((user: User) => {
      return User.isLoggedIn(user)
    }));
  }

  public isAdmin(): Observable<[boolean, boolean]> {
    return this.getSource().pipe(map((user: User) => {
      if (!User.isLoggedIn(user)) return [false, false];
      else if (!user.isAdmin) return [true, false];
      else return [true, true];
    }));
  }

  public getSource(): Observable<User> {
    let login: Observable<UserTokenModel> = this.loginUserService.getSource();
    if (login) return this.loginUserService.getSource().pipe(toUser);
    else return of(User.NullUser);
  }
  public setSource(): Promise<Observable<User>> {
    return Promise.resolve(empty());
  }
  public resetSource(): Promise<void> {
    return this.loginUserService.resetSource();
  }
}

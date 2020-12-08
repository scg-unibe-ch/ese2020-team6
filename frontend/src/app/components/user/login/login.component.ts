import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoginUserRequestBuilder, LoginUserRequestModel } from 'src/app/models/request/request.module';
import { LoginUserFormModel } from '../../../models/form/login-user-form.model';
import { LoginUserService } from '../../../services/user/login/login-user.service';
import { ILoaderSubsctiption, ValuePartialLoader } from '../../../services/service.module';
import { UserTokenModel } from 'src/app/models/response/response.module';
import { PopupService } from 'src/app/services/popup/popup.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements LoginUserRequestBuilder {

  private userInteraction: boolean = false;

  private form: NgForm;
  private values: LoginUserFormModel;
  public loginErrorMessage = '';
  private unsubscribe = (success: boolean) => {
    if (success && this.userInteraction) this.subscription.unsubscribe()
  }
  private loginSuccess = () => {
    this.router.navigate(['']);
  }
  private loginFailure = (error: any) => {
    if (error.error) {
      this.loginErrorMessage = error.error.message;
      if (this.loginErrorMessage === 'Not authorized') {
        this.form.controls.password.reset();
      } else {
        this.form.resetForm();
      }
    };
  }
  public valueLoader = new ValuePartialLoader(
    this.loginSuccess,
    this.loginFailure,
    () => {},
    (success: boolean) => this.unsubscribe(success)
  );

  public subscription: ILoaderSubsctiption<UserTokenModel, UserTokenModel>;

  constructor(
    private router: Router,
    private loginUserService: LoginUserService,
    private popupService: PopupService
  ) {
    this.loginUserService.subscribe(this.valueLoader)
    .then((subscription: ILoaderSubsctiption<UserTokenModel, UserTokenModel>) => this.subscription = subscription);
  }

  public onSubmit(form: NgForm): void {
    if (form.valid) {
      this.form = form;
      this.values = form.value;
      this.loginErrorMessage = '';
      this.userInteraction = true;
      this.loginUserService.login(this);
    } else {
      this.popupService.openPopup('root', 'The input is not valid!', 'warn');
    }
  }

  public buildLoginUserRequest(): LoginUserRequestModel {
    return {
      userName: this.values.usernameEmail,
      email: this.values.usernameEmail,
      password: this.values.password,
    };
  }
}

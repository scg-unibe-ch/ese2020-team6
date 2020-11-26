import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoginUserRequestBuilder } from '../../../models/request/user/login/login-user-request-builder.interface';
import { LoginUserRequestModel } from '../../../models/request/user/login/login-user-request.model';
import { LoginUserResponseModel } from '../../../models/response/user/login/login-user-response.model';
import { LoginUserFormModel } from '../../../models/form/login-user-form.model';
import { LoginUserService } from '../../../services/user/login/login-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements LoginUserRequestBuilder{

  private form: NgForm;
  private values: LoginUserFormModel;
  public loginErrorMessage = '';

  private loginObserverId: number;


  constructor(
    private router: Router,
    private loginUserService: LoginUserService,
  ) { }

  public onSubmit(form: NgForm): void {
    if (form.valid) {
      this.form = form;
      this.values = form.value;
      this.loginErrorMessage = '';
      this.loginUserService.login(this);
      this.loginObserverId = this.loginUserService.events.onLogin(this.loginSuccess, this.loginError)[0];
    }
  }

  public buildLoginUserRequest(): LoginUserRequestModel {
    return {
      userName: this.values.usernameEmail,
      email: this.values.usernameEmail,
      password: this.values.password,
    };
  }

  private loginSuccess = () => {
    this.form.resetForm();
    this.router.navigate(['']);
    this.loginUserService.removeObserverById.onLogin(this.loginObserverId);
  }

  private loginError = (err: any) => {
    this.loginErrorMessage = err.error.message;
  }
}

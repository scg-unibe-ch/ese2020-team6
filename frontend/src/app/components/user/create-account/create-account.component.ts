import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { RegisterUserRequestBuilder } from '../../../models/request/user/register/register-user-request-builder.interface';
import { LoginUserRequestBuilder } from '../../../models/request/user/login/login-user-request-builder.interface';
import { LoginUserRequestModel } from '../../../models/request/user/login/login-user-request.model';
import { RegisterUserRequestModel } from '../../../models/request/user/register/register-user-request.model';
import { RegisterUserFormModel } from '../../../models/form/register-user-form.model';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements LoginUserRequestBuilder, RegisterUserRequestBuilder {

  private form: NgForm;
  private values: RegisterUserFormModel;
  public registerErrorMessage: string = '';

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  public onSubmit(form: NgForm): void {
    if (form.valid) {
      this.form = form;
      this.values = form.value;
      this.registerErrorMessage = '';
      this.userService.register(this).subscribe((res: any) => {
        this.registerSuccess();
      }, (err: any) => {
        this.registerError(err);
      });
    }
  }

  public buildRegisterUserRequest(): RegisterUserRequestModel {
    return this.values;
  }

  public buildLoginUserRequest(): LoginUserRequestModel {
    return {
      queryValue: this.values.userName,
      password: this.values.password,
      isUsername: true
    };
  }

  private registerSuccess(): void {
    this.userService.login(this).subscribe((res: any) => {
      this.loginSuccess(res)
    });
  }

  private registerError(err: any): void {
    setTimeout(() => {  this.registerErrorMessage = err.error.message; }, 250);
  }

  private loginSuccess(res: any): void {
    localStorage.setItem('userToken', res.token);
    localStorage.setItem('userName', res.user.userName);
    localStorage.setItem('userId', res.user.userId);
    localStorage.setItem('isAdmin', res.user.isAdmin);
    localStorage.setItem('wallet', res.user.wallet);
    this.form.resetForm();
    this.router.navigate(['']);
  }
}

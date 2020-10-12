import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { LoginUserRequestBuilder } from '../../../models/request/user/login/login-user-request-builder.interface';
import { LoginUserRequestModel } from '../../../models/request/user/login/login-user-request.model';
import { LoginUserFormModel } from '../../../models/form/login-user-form.model';
import { UserService } from '../../../services/user/user.service';
import { validatorRegex } from '../../custom-form/validators/regex-validator-base';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements LoginUserRequestBuilder {

  private form: NgForm;
  private values: LoginUserFormModel;
  public loginErrorMessage: string = '';


  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  public onSubmit(form: NgForm): void {
    if (form.valid) {
      this.form = form;
      this.values = form.value;
      this.loginErrorMessage = '';
      this.userService.login(this).subscribe((res: any) => {
        this.loginSuccess(res);
      }, (err: any) => {
        this.loginError(err);
      });
    }
  }

  public buildLoginUserRequest(): LoginUserRequestModel {
    const usernameOrEmail = this.values.usernameEmail;
    const emailValidatorInformation = validatorRegex.email;

    return {
      queryValue: this.values.usernameEmail,
      password: this.values.password,
      isUsername: !emailValidatorInformation.regex.test(usernameOrEmail.toString())
    };
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

  private loginError(err: any): void {
    setTimeout(() => {  this.loginErrorMessage = err.error.message; }, 250);
  }
}

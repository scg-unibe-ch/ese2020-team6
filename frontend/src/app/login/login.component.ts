//import { UserAttributes } from './../../../../backend/src/models/user.model';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { environment } from '../../environments/environment';
import { LoginForm } from '../models/login-form.model';
import { LoginRequest, LoginRequestBuilder, LoginBase } from '../models/login-request.model';
import { Router } from '@angular/router';
import { validatorRegex } from '../validators/regex-validator-base';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends LoginBase<LoginForm> {

  form: NgForm;
  loginErrorMessage = '';

  constructor(
    httpClient: HttpClient,
    private router: Router
  ) {
    super(httpClient);
  }

  // tslint:disable-next-line: typedef
  onSubmit(form: NgForm) {
    if (form.valid) {
      this.loginErrorMessage = '';
      this.form = form;
      this.login(form.value);
    } else {
      console.log("Form is not valid!");
    }
  }

  // tslint:disable-next-line: typedef
  buildLoginRequestBody(loginForm: LoginForm): LoginRequest {
    const usernameOrEmail = loginForm.usernameEmail
    const emailValidatorInformation = validatorRegex.email;

    return {
      queryValue: loginForm.usernameEmail,
      password: loginForm.password,
      isUsername: !emailValidatorInformation.regex.test(usernameOrEmail.toString())
    };
  }

  loginRes(res: any) {
    localStorage.setItem('userToken', res.token);
    localStorage.setItem('userName', res.user.userName);
    localStorage.setItem('userId', res.user.userId);
    localStorage.setItem('isAdmin', res.user.isAdmin);
    localStorage.setItem('wallet', res.user.wallet);
    this.form.resetForm();
    this.router.navigate(['']);
  }

  loginErr(err: any) {
    setTimeout(() => {  this.loginErrorMessage = err.error.message; }, 250);
  }
}

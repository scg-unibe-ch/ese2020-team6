import { UserAttributes } from './../../../../backend/src/models/user.model';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { environment } from '../../environments/environment';
import { LoginForm } from '../models/login-form.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  userNotFound: false;
  errorMessage = '';

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  // tslint:disable-next-line: typedef
  onSubmit(form: NgForm) {
    this.errorMessage = '';
    // tslint:disable-next-line: prefer-const
    let requestBody = this.buildRequestBody(form.value);
    this.httpClient
    .post(environment.endpointURL + 'user/login', requestBody)
    .subscribe((res: any) => {
      localStorage.setItem('userToken', res.token);
      localStorage.setItem('userName', res.user.userName);
      localStorage.setItem('userId', res.user.userId);
      localStorage.setItem('isAdmin', res.user.isAdmin);
      form.resetForm();
      this.router.navigate(['']);
    }, (err: any) => {
      setTimeout(() => {  this.errorMessage = err.error.message; }, 250);
    });
  }

  // tslint:disable-next-line: typedef
  buildRequestBody(values: LoginForm) {
    return {
      userName: values.usernameEmail,
      password: values.password
    };
  }
}

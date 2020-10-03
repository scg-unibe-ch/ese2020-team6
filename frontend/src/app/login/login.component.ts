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

  userNotFound: boolean = false;
  errorMessage: string = '';

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  onSubmit(form: NgForm) {
    let requestBody = this.buildRequestBody(form.value);
    this.httpClient
    .post(environment.endpointURL + 'user/login', requestBody)
    .subscribe((res: any) => {
      localStorage.setItem('userToken', res.token);
      localStorage.setItem('userName', res.user.userName);
      localStorage.setItem('userId', res.user.userId);
      form.resetForm();
      this.router.navigate(['']);
    }, (err: any) => {
      this.errorMessage = err.error.message;
    })
  }

  buildRequestBody(values: LoginForm) {
    return {
      userName: values.usernameEmail,
      password: values.password
    }
  }
}

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { CreateAccountForm } from '../../../models/create-account-form.model';
import { LoginRequest, LoginRequestBuilder, LoginBase } from '../../../models/login-request.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent extends LoginBase<CreateAccountForm>{

  form: NgForm;
  loginErrorMessage = '';

  constructor(
    httpClient: HttpClient,
    private router: Router
  ) {
    super(httpClient);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.httpClient.post(environment.endpointURL + 'user/register', form.value).subscribe((res: any) => {
        this.loginErrorMessage = '';
        this.form = form;
        this.login(form.value);
      });
    } else {
      console.log('Form is not valid!');
    }
  }

  buildLoginRequestBody(createAccountForm: CreateAccountForm): LoginRequest {
    return {
      queryValue: createAccountForm.userName,
      password: createAccountForm.password,
      isUsername: true
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

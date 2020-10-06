import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { CreateAccountForm } from '../models/create-account-form.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.httpClient.post(environment.endpointURL + 'user/register', form.value).subscribe((res: any) => {
        console.log(form, this.buildLoginRequestBody(form.value));

        this.httpClient.post(environment.endpointURL + 'user/login', this.buildLoginRequestBody(form.value)).subscribe((res: any) => {
          localStorage.setItem('userToken', res.token);
          localStorage.setItem('userName', res.user.userName);
          localStorage.setItem('userId', res.user.userId);
          localStorage.setItem('isAdmin', res.user.isAdmin);
          form.resetForm();
          this.router.navigate(['']);
        })
      });
    } else {
      console.log("Form is not valid!");
    }
  }

  buildLoginRequestBody(values: CreateAccountForm): LoginForm {
    return {
      queryValue: values.userName,
      password: values.password,
      isUsername: true
    }
  }
}

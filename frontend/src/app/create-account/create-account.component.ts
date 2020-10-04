import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

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
    this.httpClient.post(environment.endpointURL + 'user/register', form.value).subscribe((res: any) => {
      this.httpClient.post(environment.endpointURL + 'user/login', form.value).subscribe((res: any) => {
        localStorage.setItem('userToken', res.token);
        localStorage.setItem('userName', res.user.userName);
        localStorage.setItem('userId', res.user.userId);
        localStorage.setItem('isAdmin', res.user.isAdmin);
        form.resetForm();
        this.router.navigate(['']);
      })
    });
  }
}

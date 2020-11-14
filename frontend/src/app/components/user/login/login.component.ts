import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoginUserRequestBuilder } from '../../../models/request/user/login/login-user-request-builder.interface';
import { LoginUserRequestModel } from '../../../models/request/user/login/login-user-request.model';
import { LoginUserResponseModel } from '../../../models/response/user/login/login-user-response.model';
import { LoginUserFormModel } from '../../../models/form/login-user-form.model';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements LoginUserRequestBuilder{

  private form: NgForm;
  private values: LoginUserFormModel;
  public loginErrorMessage: string = '';


  constructor(
    private router: Router,
    private userService: UserService,
  ) {}

  public onSubmit(form: NgForm): void {
    if (form.valid) {
      this.form = form;
      this.values = form.value;
      this.loginErrorMessage = '';
      this.userService.login(this)
      .subscribe(
        (res: LoginUserResponseModel) => {
          this.loginSuccess();
          console.log(res);

        },
        (err: any) => this.loginError(err)
      );
    }
  }

  public buildLoginUserRequest(): LoginUserRequestModel {
    return {
      userName: this.values.usernameEmail,
      email: this.values.usernameEmail,
      password: this.values.password,
    };
  }

  private loginSuccess(): void {
    this.form.resetForm();
    this.router.navigate(['']);
  }

  private loginError(err: any): void {
    this.loginErrorMessage = err.error.message;
  }
}

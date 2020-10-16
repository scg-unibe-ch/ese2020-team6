//Packages
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
//Interfaces
import { RegisterUserRequestBuilder } from '../../../models/request/user/register/register-user-request-builder.interface';
import { LoginUserRequestBuilder } from '../../../models/request/user/login/login-user-request-builder.interface';
//Models
import { LoginUserRequestModel } from '../../../models/request/user/login/login-user-request.model';
import { LoginUserResponseModel } from '../../../models/response/user/login/login-user-response.model';
import { RegisterUserRequestModel } from '../../../models/request/user/register/register-user-request.model';
import { RegisterUserResponseModel } from '../../../models/response/user/register/register-user-response.model';
import { RegisterUserFormModel } from '../../../models/form/register-user-form.model';
//Services
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements LoginUserRequestBuilder, RegisterUserRequestBuilder {

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
      this.userService.register(this).subscribe(
        (res: RegisterUserResponseModel) => this.registerSuccess(),
        (err: any) => this.registerError(err)
      );
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
    this.userService.login(this).subscribe((res: LoginUserResponseModel) => this.loginSuccess());
  }

  private registerError(err: any): void {
    setTimeout(() => this.registerErrorMessage = err.error.message, 250);
  }

  private loginSuccess(): void {
    this.form.resetForm();
    this.router.navigate(['']);
  }
}

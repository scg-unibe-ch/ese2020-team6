import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { RegisterUserRequestBuilder } from '../../../models/request/user/register/register-user-request-builder.interface';
import { LoginUserRequestBuilder } from '../../../models/request/user/login/login-user-request-builder.interface';
import { LoginUserRequestModel } from '../../../models/request/user/login/login-user-request.model';
import { LoginUserResponseModel } from '../../../models/response/user/login/login-user-response.model';
import { RegisterUserRequestModel } from '../../../models/request/user/register/register-user-request.model';
import { RegisterUserResponseModel } from '../../../models/response/user/register/register-user-response.model';
import { RegisterUserFormModel } from '../../../models/form/register-user-form.model';
import { UserService } from '../../../services/user/user.service';
import { LoginUserService } from '../../../services/user/login/login-user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements LoginUserRequestBuilder, RegisterUserRequestBuilder {

  private form: NgForm;
  private values: RegisterUserFormModel;
  public registerErrorMessage = '';

  constructor(
    private router: Router,
    private userService: UserService,
    private loginUserService: LoginUserService
  ) {}

  public validateCrossFieldPassword(form: NgForm): void {
    const validationResults = form.control.validator(form.control);
    if (validationResults) {
      this.registerErrorMessage = form.control.validator(form.control).crossFieldPassword.errorMessages[0];
    } else { this.registerErrorMessage = null; }
  }

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
      userName: this.values.userName,
      email: '',
      password: this.values.password
    };
  }

  private registerSuccess(): void {
    this.loginUserService.login(this).events.onLogin((res: LoginUserResponseModel) => this.loginSuccess());
  }

  private registerError(err: any): void {
    this.registerErrorMessage = err.error.message;
  }

  private loginSuccess(): void {
    this.form.resetForm();
    this.router.navigate(['']);
  }
}

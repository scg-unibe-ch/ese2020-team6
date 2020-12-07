import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { RegisterUserRequestBuilder } from '../../../models/request/user/register/register-user-request-builder.interface';
import { LoginUserRequestBuilder } from '../../../models/request/user/login/login-user-request-builder.interface';
import { LoginUserRequestModel } from '../../../models/request/user/login/login-user-request.model';
import { RegisterUserRequestModel } from '../../../models/request/user/register/register-user-request.model';
import { RegisterUserResponseModel } from '../../../models/response/user/register/register-user-response.model';
import { RegisterUserFormModel } from '../../../models/form/register-user-form.model';
import { RegisterUserService } from '../../../services/user/register/register-user.service';
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
  public picture: string;
  public previewPicture: string;

  constructor(
    private router: Router,
    private registerUserService: RegisterUserService,
    private loginUserService: LoginUserService,
  ) {}

  public validateCrossFieldPassword(form: NgForm): void {
    const validationResults = form.control.validator(form.control);
    if (validationResults) {
      this.registerErrorMessage = form.control.validator(form.control).crossFieldPassword.errorMessages[0];
    } else { this.registerErrorMessage = null; }
  }

  public onSubmit(form: NgForm): void {
    if (form.valid) {
      const formData = new FormData();
      formData.append('picture', this.picture);
      formData.append('email', form.value.email);
      formData.append('firstName', form.value.firstName);
      formData.append('lastName', form.value.lastName);
      formData.append('gender', form.value.gender);
      formData.append('password', form.value.password);
      formData.append('phonenumber', form.value.phonenumber);
      formData.append('repeatPassword', form.value.repeatPassword);
      formData.append('userName', form.value.userName);
      const addressString = JSON.stringify(form.value.address);
      formData.append('address', addressString);

      this.form = form;
      this.values = form.value;
      this.registerErrorMessage = '';
      this.registerUserService.register(formData).subscribe(
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
    this.loginUserService.login(this)
  }

  private registerError(err: any): void {
    this.registerErrorMessage = err.error.message;
  }

  private loginSuccess(): void {
    this.form.resetForm();
    this.router.navigate(['']);
  }

  public selectFile(event): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.picture = file;
    }
    // for preview picture
    const reader = new FileReader();
    reader.onload = (event: any) => {
      const result: string = event.target.result;
      this.previewPicture = result;
    };
    reader.readAsDataURL(event.target.files[0]);
  }
}

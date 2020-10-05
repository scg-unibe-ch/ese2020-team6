import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoItemComponent } from './todo-list/todo-item/todo-item.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthInterceptor } from './auth/auth.interceptor';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { MatMenuModule } from '@angular/material/menu';
import { OverlayModule } from '@angular/cdk/overlay';
import { EmailValidatorDirective } from './validators/email/email-validator.directive';
import { PasswordValidatorDirective } from './validators/password/password-validator.directive';

// Login Bar
import { LogoutComponent } from './login-bar/logout/logout.component';
import { LoginBarComponent } from './login-bar/login-bar.component';

// Custom Form
import { SelectComponent } from './custom-form/select/select.component';
import { TextInputComponent } from './custom-form/input/text-input/text-input.component';
import { NumberInputComponent } from './custom-form/input/number-input/number-input.component';
import { PasswordInputComponent } from './custom-form/input/password-input/password-input.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AdminUserProfileComponent } from './admin-user-profile/admin-user-profile.component';
import { HouseNumberValidatorDirective } from './validators/house-number/house-number-validator.directive';
import { NounValidatorDirective } from './validators/noun/noun-validator.directive';
import { PhonenumberValidatorDirective } from './validators/phonenumber/phonenumber-validator.directive';
import { PlzValidatorDirective } from './validators/plz/plz-validator.directive';
import { UsernameValidatorDirective } from './validators/username/username-validator.directive';
import { GenderValidatorDirective } from './validators/gender/gender-validator.directive';
import { UsernameOrEmailValidatorDirective } from './validators/username-or-email/username-or-email-validator.directive';
import { ErrorMessagesComponent } from './custom-form/error-messages/error-messages.component';
import { ErrorMessageComponent } from './custom-form/error-messages/error-message/error-message.component';
import { PasswordMatchValidatorDirective } from './validators/cross-field/password-match-validator.directive';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoItemComponent,
    HomeComponent,
    LoginBarComponent,
    LoginComponent,
    CreateAccountComponent,
    SelectComponent,
    TextInputComponent,
    NumberInputComponent,
    PasswordInputComponent,
    LogoutComponent,
    EmailValidatorDirective,
    PasswordValidatorDirective,
    UserProfileComponent,
    AdminUserProfileComponent,
    HouseNumberValidatorDirective,
    NounValidatorDirective,
    PhonenumberValidatorDirective,
    PlzValidatorDirective,
    UsernameValidatorDirective,
    GenderValidatorDirective,
    UsernameOrEmailValidatorDirective,
    ErrorMessagesComponent,
    ErrorMessageComponent,
    PasswordMatchValidatorDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatListModule,
    MatMenuModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,
    MatTabsModule,
    MatToolbarModule,
    OverlayModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'user/login', component: LoginComponent },
      { path: 'user/register', component: CreateAccountComponent },
      { path: 'user/profile', component: UserProfileComponent },
      { path: 'user/admin-user-profile', component: AdminUserProfileComponent }
    ])
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

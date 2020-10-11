// Modules
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthInterceptor } from './auth/auth.interceptor';
import { MatMenuModule } from '@angular/material/menu';
import { OverlayModule } from '@angular/cdk/overlay';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



// ---------------------------------------------------------------------------------//
import { AppComponent } from './app.component';
// Components
//  User
//    Login
import { LoginComponent } from './components/user/login/login.component';
//    Logout
import { LogoutComponent } from './components/user/logout/logout.component';
//    Create Account
import { CreateAccountComponent } from './components/user/create-account/create-account.component';
//    Profile
//      User Profile
import { UserProfileComponent } from './components/user/profile/user-profile/user-profile.component';
//      Admin Profile
import { AdminUserProfileComponent } from './components/user/profile/admin-user-profile/admin-user-profile.component';
//    Wallet
import { WalletComponent } from './components/user/wallet/wallet.component';


//  Home
import { HomeComponent } from './components/home/home.component';
//  Login Bar
import { LoginBarComponent } from './components/home/login-bar/login-bar.component';


// Custom Form
//  Input
import { TextInputComponent } from './components/custom-form/input/text-input/text-input.component';
import { NumberInputComponent } from './components/custom-form/input/number-input/number-input.component';
import { PasswordInputComponent } from './components/custom-form/input/password-input/password-input.component';
//  Select
import { SelectComponent } from './components/custom-form/select/select.component';
//  Validators
import { HouseNumberValidatorDirective } from './components/custom-form/validators/house-number/house-number-validator.directive';
import { NounValidatorDirective } from './components/custom-form/validators/noun/noun-validator.directive';
import { PhonenumberValidatorDirective } from './components/custom-form/validators/phonenumber/phonenumber-validator.directive';
import { PlzValidatorDirective } from './components/custom-form/validators/plz/plz-validator.directive';
import { UsernameValidatorDirective } from './components/custom-form/validators/username/username-validator.directive';
import { GenderValidatorDirective } from './components/custom-form/validators/gender/gender-validator.directive';
import { UsernameOrEmailValidatorDirective } from './components/custom-form/validators/username-or-email/username-or-email-validator.directive';
import { EmailValidatorDirective } from './components/custom-form/validators/email/email-validator.directive';
import { PasswordValidatorDirective } from './components/custom-form/validators/password/password-validator.directive';
//    Cross Field
import { PasswordMatchValidatorDirective } from './components/custom-form/validators/cross-field/password-match-validator.directive';
import { PostProductComponent } from './components/home/product/post/post-product.component';
import { BuyProductComponent } from './components/home/product/buy-product/buy-product.component';
// ---------------------------------------------------------------------------------//



// import { ErrorMessagesComponent } from './custom-form/error-messages/error-messages.component';
// import { ErrorMessageComponent } from './custom-form/error-messages/error-message/error-message.component';
// import { TodoListComponent } from './todo-list/todo-list.component';
// import { TodoItemComponent } from './todo-list/todo-item/todo-item.component';

@NgModule({
  declarations: [
    AppComponent,
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
    // ErrorMessagesComponent,
    // ErrorMessageComponent,
    // TodoListComponent,
    // TodoItemComponent,
    PasswordMatchValidatorDirective,
    WalletComponent,
    PostProductComponent,
    BuyProductComponent,
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
      { path: 'user/admin-user-profile', component: AdminUserProfileComponent },
      { path: 'user/wallet' , component: WalletComponent},
      { path: 'product/post' , component: PostProductComponent},
      { path: 'product/buy-product' , component: BuyProductComponent},
    ]),
    NgbModule
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

// --------------------------------------------------------------------------------- //



// Modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

//  Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar, MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';
import { FullscreenOverlayContainer, OverlayContainer, OverlayModule } from '@angular/cdk/overlay';

//  Interceptors
import { AuthInterceptor } from './auth/auth.interceptor';

//  Bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



// --------------------------------------------------------------------------------- //



import { AppComponent } from './app.component';
// Components
//  User
//    Login
import { LoginComponent } from './components/user/login/login.component';
//    Logout
import { LogoutComponent } from './components/user/logout/logout.component';
//    Create Account
import {  RegisterComponent } from './components/user/register/register.component';
//    Profile
import { ProfileComponent } from './components/user/profile/profile.component';
//      My Products
import { MyProductsComponent } from './components/user/profile/my-products/my-products.component';
//      Profile Navigation
import { ProfileNavigationComponent } from './components/user/profile/profile-navigation/profile-navigation.component';
//      User Details
import { UserDetailsComponent } from './components/user/profile/user-details/user-details.component';
//      Approve Products
import { ApproveProductsComponent } from './components/user/profile/approve-products/approve-products.component';

//  Home
import { HomeComponent } from './components/home/home.component';
//  Login Bar
import { MenuBarComponent } from './components/home/menu-bar/menu-bar.component';


import { PostProductComponent } from './components/home/product/post/post-product.component';
import { BuyProductComponent } from './components/home/product/buy-product/buy-product.component';
import { ProductInformationComponent } from './components/home/product/product-information/product-information.component';
import { ProductCardListComponent } from './components/home/product/display/product-card/list/product-card-list.component';
import { ProductCardGridComponent } from './components/home/product/display/product-card/grid/product-card-grid.component';
import { ProductCardComponent } from './components/home/product/display/product-card/product-card.component';


// Custom Form
//  Input
import { TextInputComponent } from './components/custom-form/input/text-input/text-input.component';
import { NumberInputComponent } from './components/custom-form/input/number-input/number-input.component';
import { PasswordInputComponent } from './components/custom-form/input/password-input/password-input.component';
//  Select
import { SelectComponent } from './components/custom-form/select/select.component';


import { UserIconComponent } from './components/icons/user-icon/user-icon.component';
import { AngleIconComponent } from './components/icons/angle-icon/angle-icon.component';

// --------------------------------------------------------------------------------- //



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



// --------------------------------------------------------------------------------- //



import { routes } from './router/router';
import { defaultUserNavigationElements, defaultProfileComponent } from './components/user/profile/navigation-elements';
import { ProductPillComponent } from './components/home/product/display/product-card/product-pill/product-pill.component';
import { ProductViewComponent } from './components/home/product/display/product-view/product-view.component';
import { ProductViewListComponent } from './components/home/product/display/product-view/list/product-view-list.component';
import { ProductViewGridComponent } from './components/home/product/display/product-view/grid/product-view-grid.component';


@NgModule({
  declarations: [
    AppComponent,
    //Components
    HomeComponent,
    MenuBarComponent,
    LoginComponent,
    RegisterComponent,
    SelectComponent,
    TextInputComponent,
    NumberInputComponent,
    PasswordInputComponent,
    LogoutComponent,
    PostProductComponent,
    BuyProductComponent,
    ProfileComponent,
    ProfileNavigationComponent,
    MyProductsComponent,
    UserDetailsComponent,
    ProductInformationComponent,
    ApproveProductsComponent,
    ProductCardListComponent,
    //Validators
    EmailValidatorDirective,
    PasswordValidatorDirective,
    HouseNumberValidatorDirective,
    NounValidatorDirective,
    PhonenumberValidatorDirective,
    PlzValidatorDirective,
    UsernameValidatorDirective,
    GenderValidatorDirective,
    UsernameOrEmailValidatorDirective,
    //Crossfield
    PasswordMatchValidatorDirective,
    PostProductComponent,
    BuyProductComponent,
    ProfileComponent,
    ProfileNavigationComponent,
    MyProductsComponent,
    UserDetailsComponent,
    ProductInformationComponent,
    UserIconComponent,
    ApproveProductsComponent,
    AngleIconComponent,
    ProductCardGridComponent,
    ProductCardComponent,
    ProductPillComponent,
    ProductViewComponent,
    ProductViewListComponent,
    ProductViewGridComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes), // gets its information from 'router/router.ts'
    NgbModule,
    //Angular Material
    MatButtonModule,
    MatListModule,
    MatMenuModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,
    MatTabsModule,
    MatToolbarModule,
    MatSnackBarModule,
    OverlayModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: OverlayContainer,
      useClass: FullscreenOverlayContainer
    },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {duration: 2500}
    },
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

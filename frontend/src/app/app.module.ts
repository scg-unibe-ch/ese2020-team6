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
import { ProductInformationComponent } from './components/home/product/product-information/product-information.component';
import { ProductCardListComponent } from './components/home/product/display/product-card/list/product-card-list.component';
import { ProductCardGridComponent } from './components/home/product/display/product-card/grid/product-card-grid.component';
import { ProductCardComponent } from './components/home/product/display/product-card/product-card.component';
import { ProductPillComponent } from './components/home/product/display/product-card/product-pill/product-pill.component';
import { ProductViewComponent } from './components/home/product/display/product-view/product-view.component';
import { ProductViewListComponent } from './components/home/product/display/product-view/list/product-view-list.component';
import { ProductViewGridComponent } from './components/home/product/display/product-view/grid/product-view-grid.component';
import { PurchaseProductComponent } from './components/home/product/product-information/purchase-product/purchase-product.component';
import { EditProductComponent } from './components/home/product/product-information/edit-product/edit-product.component';
import { ReviewProductComponent } from './components/home/product/product-information/review-product/review-product.component';
import { ProductDetailsComponent } from './components/home/product/product-information/product-details/product-details.component';


// Custom Form
//  Input
import { TextInputComponent } from './components/custom-form/input/text-input/text-input.component';
import { NumberInputComponent } from './components/custom-form/input/number-input/number-input.component';
import { PasswordInputComponent } from './components/custom-form/input/password-input/password-input.component';
//  Select
import { SelectComponent } from './components/custom-form/select/select.component';
//  Text-Area
import { TextAreaComponent } from './components/custom-form/text-area/text-area.component';


import { UserIconComponent } from './components/icons/user-icon/user-icon.component';
import { AngleIconComponent } from './components/icons/angle-icon/angle-icon.component';

// --------------------------------------------------------------------------------- //



//  Validators
import { HouseNumberValidatorDirective } from './components/custom-form/validators/regex/house-number/house-number-validator.directive';
import { NounValidatorDirective } from './components/custom-form/validators/regex/noun/noun-validator.directive';
import { PhonenumberValidatorDirective } from './components/custom-form/validators/regex/phonenumber/phonenumber-validator.directive';
import { PlzValidatorDirective } from './components/custom-form/validators/regex/plz/plz-validator.directive';
import { UsernameValidatorDirective } from './components/custom-form/validators/regex/username/username-validator.directive';
import { UsernameOrEmailValidatorDirective } from './components/custom-form/validators/regex/username-or-email/username-or-email-validator.directive';
import { EmailValidatorDirective } from './components/custom-form/validators/regex/email/email-validator.directive';
import { PasswordValidatorDirective } from './components/custom-form/validators/regex/password/password-validator.directive';
import { ProductTypeValidatorDirective } from './components/custom-form/validators/select/product-type/product-type-validator.directive';
import { OfferTypeValidatorDirective } from './components/custom-form/validators/select/offer-type/offer-type-validator.directive';
import { StatusValidatorDirective } from './components/custom-form/validators/select/status/status-validator.directive';
import { DeliverableValidatorDirective } from './components/custom-form/validators/select/deliverable/deliverable-validator.directive';
import { CategoryValidatorDirective } from './components/custom-form/validators/select/category/category-validator.directive';
import { SubcategoryValidatorDirective } from './components/custom-form/validators/select/category/subcategory/subcategory-validator.directive';
import { TitleValidatorDirective } from './components/custom-form/validators/regex/title/title-validator.directive';
import { DescriptionValidatorDirective } from './components/custom-form/validators/regex/description/description-validator.directive';
import { PriceValidatorDirective } from './components/custom-form/validators/regex/price/price-validator.directive';
import { LocationValidatorDirective } from './components/custom-form/validators/regex/location/location-validator.directive';
import { DateValidatorDirective } from './components/custom-form/validators/date/date-validator.directive';
//    Cross Field
import { PasswordMatchValidatorDirective } from './components/custom-form/validators/cross-field/password-match-validator.directive';
//    Select
import { GenderValidatorDirective } from './components/custom-form/validators/select/gender/gender-validator.directive';



// --------------------------------------------------------------------------------- //



import { routes } from './router/router';
import { defaultUserNavigationElements, defaultProfileComponent } from './components/user/profile/navigation-elements';
import { RejectionMessageValidatorDirective } from './components/custom-form/validators/regex/rejection-message/rejection-message-validator.directive';
import { RejectedProductsComponent } from './components/user/profile/rejected-products/rejected-products.component';
import { PopupRejectedComponent } from './components/user/profile/profile-navigation/popup/rejected/popup-rejected.component';
import { PopupUnreviewedComponent } from './components/user/profile/profile-navigation/popup/unreviewed/popup-unreviewed.component';
import { PopupDirective } from './components/user/profile/profile-navigation/popup/popup.directive';
import { NavigationElementComponent } from './components/user/profile/profile-navigation/navigation-element/navigation-element.component';
import { PreferencesComponent } from './components/user/profile/preferences/preferences.component';
import { ValidationComponent } from './components/custom-form/input/validation/validation.component';
import { DateComponent } from './components/custom-form/input/date/date.component';
import { SearchProductComponent } from './components/home/product/search-product/search-product.component';
import { SelectCategoriesComponent } from './components/home/product/display/product-view/select-categories/select-categories.component';
import { FileComponent } from './components/custom-form/input/file/file.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { BuyItemComponent } from './components/checkout/buy-item/buy-item.component';


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
    ProductViewGridComponent,
    PurchaseProductComponent,
    EditProductComponent,
    ReviewProductComponent,
    ProductDetailsComponent,
    TitleValidatorDirective,
    DescriptionValidatorDirective,
    PriceValidatorDirective,
    LocationValidatorDirective,
    DateValidatorDirective,
    TextAreaComponent,
    ProductTypeValidatorDirective,
    OfferTypeValidatorDirective,
    StatusValidatorDirective,
    DeliverableValidatorDirective,
    CategoryValidatorDirective,
    SubcategoryValidatorDirective,
    RejectionMessageValidatorDirective,
    RejectedProductsComponent,
    PopupUnreviewedComponent,
    PopupRejectedComponent,
    PopupDirective,
    NavigationElementComponent,
    PreferencesComponent,
    ValidationComponent,
    DateComponent,
    SearchProductComponent,
    SelectCategoriesComponent,
    FileComponent,
    CheckoutComponent,
    BuyItemComponent,

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

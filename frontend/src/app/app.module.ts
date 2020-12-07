import { SelectCategoriesComponent } from './components/product/search-product/select-categories/select-categories.component';
// --------------------------------------------------------------------------------- //



// Modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';
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
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';


import { PostProductComponent } from './components/product/post/post-product.component';
import { ProductInformationComponent } from './components/product/product-information/product-information.component';
import { ProductCardListComponent } from './components/product/display/product-card/list/product-card-list.component';
import { ProductCardGridComponent } from './components/product/display/product-card/grid/product-card-grid.component';
import { ProductCardDirective } from './components/product/display/product-card/product-card.directive';
import { ProductPillComponent } from './components/product/display/product-card/product-pill/product-pill.component';
import { ProductViewComponent } from './components/product/display/product-view/product-view.component';
import { ProductViewListComponent } from './components/product/display/product-view/list/product-view-list.component';
import { ProductViewGridComponent } from './components/product/display/product-view/grid/product-view-grid.component';
import { PurchaseProductComponent } from './components/product/product-information/purchase-product/purchase-product.component';
import { EditProductComponent } from './components/product/product-information/edit-product/edit-product.component';
import { ReviewProductComponent } from './components/product/product-information/review-product/review-product.component';
import { ProductDetailsComponent } from './components/product/product-information/product-details/product-details.component';


// Custom Form
import { CustomFormModule } from './components/custom-form/custom-form.module';


import { UserIconComponent } from './components/icons/user-icon/user-icon.component';
import { AngleIconComponent } from './components/icons/angle-icon/angle-icon.component';

// --------------------------------------------------------------------------------- //



import { routes } from './router/router';
import { RejectedProductsComponent } from './components/user/profile/rejected-products/rejected-products.component';
import { PopupRejectedComponent } from './components/user/profile/profile-navigation/popup/rejected/popup-rejected.component';
import { PopupUnreviewedComponent } from './components/user/profile/profile-navigation/popup/unreviewed/popup-unreviewed.component';
import { PopupDirective } from './components/user/profile/profile-navigation/popup/popup.directive';
import { NavigationElementComponent } from './components/user/profile/profile-navigation/navigation-element/navigation-element.component';
import { PreferencesComponent } from './components/user/profile/preferences/preferences.component';
import { SearchProductComponent } from './components/product/search-product/search-product.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { BuyItemComponent } from './components/checkout/stagable/buy-item/buy-item.component';
import { ShippingComponent } from './components/checkout/stagable/stage/shipping/shipping.component';
import { StageIndicatorComponent } from './components/checkout/stagable/stage-indicator/stage-indicator.component';
import { PaymentMethodComponent } from './components/checkout/stagable/stage/payment-method/payment-method.component';
import { StageComponent } from './components/checkout/stagable/stage/stage.component';
import { StagesDirective } from './components/checkout/stagable/stages.directive';
import { MapComponent } from './components/map/map.component';
import { RentItemComponent } from './components/checkout/stagable/rent-item/rent-item.component';
import { DurationComponent } from './components/checkout/stagable/stage/duration/duration.component';
import { PurchaseServiceComponent } from './components/checkout/stagable/purchase-service/purchase-service.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SellerOrdersComponent } from './components/user/profile/seller-orders/seller-orders.component';
import { BuyerOrdersComponent } from './components/user/profile/buyer-orders/buyer-orders.component';
import { OrderViewComponent } from './components/order/display/view/order-view.component';
import { OrderViewListComponent } from './components/order/display/view/list/order-view-list.component';
import { OrderViewGridComponent } from './components/order/display/view/grid/order-view-grid.component';
import { OrderCardGridComponent } from './components/order/display/card/grid/order-card-grid.component';
import { OrderCardListComponent } from './components/order/display/card/list/order-card-list.component';
import { OrderCardDirective } from './components/order/display/card/order-card.directive';
import { LoaderComponent } from './components/loader/loader.component';
import { LoadingIndicatorComponent } from './components/loader/indicator/loading-indicator.component';
import { CardModule } from './components/card/card.module';
import { ThemeModule } from './models/theme/theme.module';
import { LogoComponent } from './components/icons/logo/logo.component';
import { SixComponent } from './components/icons/logo/six/six.component';
import { PlusComponent } from './components/icons/plus/plus.component';
import { IconComponent } from './components/icons/logo/icon/icon.component';
import { LogoCenterComponent } from './components/icons/logo/center/logo-center.component';
import { MessageModule } from './components/message/message.module';
import { LoaderModule } from './components/loader/loader.module';
import { NewMessagesComponent } from './components/user/profile/profile-navigation/popup/new-messages/new-messages.component';

@NgModule({
  declarations: [
    AppComponent,
    //Components
    HomeComponent,
    MenuBarComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    PostProductComponent,
    ProfileComponent,
    ProfileNavigationComponent,
    MyProductsComponent,
    UserDetailsComponent,
    ProductInformationComponent,
    ApproveProductsComponent,
    ProductCardListComponent,
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
    ProductCardDirective,
    ProductPillComponent,
    ProductViewComponent,
    ProductViewListComponent,
    ProductViewGridComponent,
    PurchaseProductComponent,
    EditProductComponent,
    ReviewProductComponent,
    ProductDetailsComponent,
    RejectedProductsComponent,
    PopupUnreviewedComponent,
    PopupRejectedComponent,
    PopupDirective,
    NavigationElementComponent,
    PreferencesComponent,
    SearchProductComponent,
    CheckoutComponent,
    BuyItemComponent,
    ShippingComponent,
    StageIndicatorComponent,
    StagesDirective,
    PaymentMethodComponent,
    StageComponent,
    MapComponent,
    RentItemComponent,
    DurationComponent,
    PurchaseServiceComponent,
    SelectCategoriesComponent,
    SellerOrdersComponent,
    BuyerOrdersComponent,
    OrderViewComponent,
    OrderViewListComponent,
    OrderViewGridComponent,
    OrderCardGridComponent,
    OrderCardListComponent,
    OrderCardDirective,
    LogoComponent,
    SixComponent,
    PlusComponent,
    IconComponent,
    LogoCenterComponent,
    NewMessagesComponent
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
    MatSlideToggleModule,
    CardModule,
    CustomFormModule,
    ThemeModule,
    MessageModule,
    LoaderModule
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

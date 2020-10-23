// Components
import { LoginComponent } from './../components/user/login/login.component';
import { RegisterComponent } from './../components/user/register/register.component';
import { ProfileComponent } from './../components/user/profile/profile.component';
import { MyProductsComponent } from './../components/user/profile/my-products/my-products.component';
import { UserDetailsComponent } from './../components/user/profile/user-details/user-details.component';
import { HomeComponent } from './../components/home/home.component';
import { PostProductComponent } from './../components/home/product/post/post-product.component';
import { ProductInformationComponent } from './../components/home/product/product-information/product-information.component';
import { ApproveProductsComponent } from './../components/user/profile/approve-products/approve-products.component';
import { PurchaseProductComponent } from './../components/home/product/product-information/purchase-product/purchase-product.component';
import { EditProductComponent } from './../components/home/product/product-information/edit-product/edit-product.component';
import { ReviewProductComponent } from './../components/home/product/product-information/review-product/review-product.component';

// Guards
import { AuthGuard } from './guards/auth-guard/auth.guard';
import { AuthAdminGuard } from './guards/auth-guard/auth-admin.guard';
import { CreatorGuard, NotCreatorGuard } from './guards/product/creator.guard';
import { defaultUserNavigationElements, defaultProfileComponent } from './../components/user/profile/navigation-elements';

export const routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'user',
    redirectTo: 'user/profile'
  },
  {
    path: 'user',
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'profile',
        redirectTo: 'profile/' + defaultUserNavigationElements[defaultProfileComponent].path,
        pathMatch: 'full'
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: 'details',
            component: UserDetailsComponent
          },
          {
            path: 'myproducts',
            component: MyProductsComponent
          },
          {
            path: 'createnewproduct',
            component: PostProductComponent
          },
          {
            path: 'reviewproducts',
            component: ApproveProductsComponent
          }
        ]
      }
    ]
  },
  {
    path: 'product',
    redirectTo: 'product/post',
    pathMatch: 'full'
  },
  {
    path: 'product',
    children: [
      {
        path: 'post' ,
        component: PostProductComponent
      },
      {
        path: 'post/:productId' ,
        component: PostProductComponent
      },
      {
        path: 'information/:productId',
        redirectTo: 'information/:productId/purchase',
        pathMatch: 'full'
      },
      {
        path: 'information/:productId',
        component: ProductInformationComponent,
        children : [
          {
            path: 'review',
            component: ReviewProductComponent,
            canActivate: [AuthAdminGuard, AuthGuard],
            data: {
              canActivateDestination: 'purchase'
            }
          },
          {
            path: 'purchase',
            component: PurchaseProductComponent,
            canActivate: [NotCreatorGuard],
            data: {
              canActivate: {
                destination: 'edit'
              }
            }
          },
          {
            path: 'edit',
            component: EditProductComponent,
            canActivate: [CreatorGuard, AuthGuard],
            data: {
              canActivate: {
                destination: 'purchase'
              }
            }
          }
        ]
      }
    ]
  }
]

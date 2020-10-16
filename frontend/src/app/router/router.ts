// Components
import { LoginComponent } from './../components/user/login/login.component';
import {  RegisterComponent } from './../components/user/register/register.component';
import { ProfileComponent } from './../components/user/profile/profile.component';
import { MyProductsComponent } from './../components/user/profile/my-products/my-products.component';
import { UserDetailsComponent } from './../components/user/profile/user-details/user-details.component';
import { HomeComponent } from './../components/home/home.component';
import { PostProductComponent } from './../components/home/product/post/post-product.component';
import { BuyProductComponent } from './../components/home/product/buy-product/buy-product.component';
import { ProductInformationComponent } from './../components/home/product/product-information/product-information.component';
import { ApproveProductsComponent } from './../components/user/profile/approve-products/approve-products.component';

import { defaultUserNavigationElements, defaultProfileComponent } from './../components/user/profile/navigation-elements';

export const routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'user/login',
    component: LoginComponent
  },
  {
    path: 'user/register',
    component: RegisterComponent
  },
  {
    path: 'user/profile',
    redirectTo: 'user/profile/' + defaultUserNavigationElements[defaultProfileComponent].path
  },
  {
    path: 'user/profile',
    component: ProfileComponent,
    data: defaultUserNavigationElements[defaultProfileComponent],
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
        path: 'approveproducts',
        component: ApproveProductsComponent
      }
    ]
  },
  {
    path: 'product/post' ,
    component: PostProductComponent
  },
  {
    path: 'product/buy-product' ,
    component: BuyProductComponent
  },
  {
    path: 'product/product-information/:id' ,
    component: ProductInformationComponent
  }
]

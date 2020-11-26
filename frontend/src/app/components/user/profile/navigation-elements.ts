import { ProfileNavigationElementModel } from '../../../models/user/profile/navigation-element/profile-navigation-element.model';
import { PostProductComponent } from '../../../components/home/product/post/post-product.component';
import { ApproveProductsComponent } from '../../../components/user/profile/approve-products/approve-products.component';
import { UserDetailsComponent } from '../../../components/user/profile/user-details/user-details.component';
import { MyProductsComponent } from '../../../components/user/profile/my-products/my-products.component';
import { RejectedProductsComponent } from '../../../components/user/profile/rejected-products/rejected-products.component';
import { PopupUnreviewedComponent } from '../../../components/user/profile/profile-navigation/popup/unreviewed/popup-unreviewed.component';
import { PopupRejectedComponent } from '../../../components/user/profile/profile-navigation/popup/rejected/popup-rejected.component';
import { PreferencesComponent } from '../../../components/user/profile/preferences/preferences.component';
import { SellerOrdersComponent } from '../../../components/user/profile/seller-orders/seller-orders.component';
import { BuyerOrdersComponent } from '../../../components/user/profile/buyer-orders/buyer-orders.component';
import { MessagesComponent } from './messages/messages.component';



export const defaultProfileComponent = 0;

export const defaultUserNavigationElements: Array<ProfileNavigationElementModel>  = [
  {
    title: 'User Details',
    path: 'details',
    component: UserDetailsComponent,
    popupComponent: null
  },
  {
    title: 'Preferences',
    path: 'preferences',
    component: PreferencesComponent,
    popupComponent: null
  },
  {
    title: 'Messages',
    path: 'messages',
    component: MessagesComponent,
    popupComponent: null
  },
  {
    title: 'My Products',
    path: 'myproducts',
    component: MyProductsComponent,
    popupComponent: null
  },
  {
    title: 'Create New Product',
    path: 'createnewproduct',
    component: PostProductComponent,
    popupComponent: null
  },
  {
    title: 'Rejected Products',
    path: 'rejected',
    component: RejectedProductsComponent,
    popupComponent: PopupRejectedComponent
  },
  {
    title: 'Purchased Products',
    path: 'buyer',
    component: BuyerOrdersComponent,
    popupComponent: null
  },
  {
    title: 'Sold Products',
    path: 'seller',
    component: SellerOrdersComponent,
    popupComponent: null
  }
];

export const adminNavigationElements: Array<ProfileNavigationElementModel> = new Array<ProfileNavigationElementModel>();

defaultUserNavigationElements.forEach((navigationElement: ProfileNavigationElementModel) => {
  adminNavigationElements.push(navigationElement);
});

adminNavigationElements.push(
  {
    title: 'Review Products',
    path: 'reviewproducts',
    component: ApproveProductsComponent,
    popupComponent: PopupUnreviewedComponent
  }
);

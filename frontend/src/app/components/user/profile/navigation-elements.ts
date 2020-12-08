import { NewMessagesComponent } from './profile-navigation/popup/new-messages/new-messages.component';
import { ProfileNavigationElementModel } from 'src/app/models/user/profile/navigation-element/profile-navigation-element.model';
import { PostProductComponent } from 'src/app/components/product/post/post-product.component';
import { ApproveProductsComponent } from 'src/app/components/user/profile/approve-products/approve-products.component';
import { UserDetailsComponent } from 'src/app/components/user/profile/user-details/user-details.component';
import { MyProductsComponent } from 'src/app/components/user/profile/my-products/my-products.component';
import { RejectedProductsComponent } from 'src/app/components/user/profile/rejected-products/rejected-products.component';
import { PopupUnreviewedComponent } from 'src/app/components/user/profile/profile-navigation/popup/unreviewed/popup-unreviewed.component';
import { PopupRejectedComponent } from 'src/app/components/user/profile/profile-navigation/popup/rejected/popup-rejected.component';
import { PreferencesComponent } from 'src/app/components/user/profile/preferences/preferences.component';
import { SellerOrdersComponent } from 'src/app/components/user/profile/seller-orders/seller-orders.component';
import { BuyerOrdersComponent } from 'src/app/components/user/profile/buyer-orders/buyer-orders.component';
import { MessengerComponent } from 'src/app/components/message/messenger.component';


export const defaultProfileComponent = 0;
export const defaultUserNavigationElements: Array<ProfileNavigationElementModel>  = [
  {
    title: 'User Detils',
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
    component: MessengerComponent,
    popupComponent: NewMessagesComponent
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

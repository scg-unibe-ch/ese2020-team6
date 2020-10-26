import { ProfileNavigationElementModel } from '../../../models/form/profile-navigation-element.model';
import { PostProductComponent } from '../../../components/home/product/post/post-product.component';
import { ApproveProductsComponent } from '../../../components/user/profile/approve-products/approve-products.component';
import { UserDetailsComponent } from '../../../components/user/profile/user-details/user-details.component';
import { MyProductsComponent } from '../../../components/user/profile/my-products/my-products.component';
import { RejectedProductsComponent } from '../../../components/user/profile/rejected-products/rejected-products.component';
import { PopupUnreviewedComponent } from '../../../components/user/profile/profile-navigation/popup/unreviewed/popup-unreviewed.component';
import { PopupRejectedComponent } from '../../../components/user/profile/profile-navigation/popup/rejected/popup-rejected.component';
import { PreferencesComponent } from '../../../components/user/profile/preferences/preferences.component';


export const defaultProfileComponent: number = 0;

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
    popupComponent: PopupRejectedComponent
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

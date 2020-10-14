import { ProfileNavigationElementModel } from '../../../models/form/profile-navigation-element.model';

export const defaultProfileComponent: number = 0;

export const defaultUserNavigationElements: Array<ProfileNavigationElementModel>  = [
  {
    title: 'User Details',
    path: 'details'
  },
  {
    title: 'My Products',
    path: 'myproducts'
  }, {
    title: 'Create New Product',
    path: 'createnewproduct'
  }
];

export const adminNavigationElements: Array<ProfileNavigationElementModel> = new Array<ProfileNavigationElementModel>();

defaultUserNavigationElements.forEach((navigationElement: ProfileNavigationElementModel) => {
  adminNavigationElements.push(navigationElement);
});

adminNavigationElements.push(
  {
    title: 'Approve Products',
    path: 'approveproducts'
  }
);

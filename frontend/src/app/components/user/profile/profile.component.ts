import { Component } from '@angular/core';
import { ProfileNavigationElementModel } from '../../../models/form/profile-navigation-element.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  navigationElements = [
    {
      title: 'User Details',
      path: 'details'
    },
    {
      title: "My Products",
      path: 'myproducts'
    }, {
      title: "Create New Product",
      path: 'createnewproduct'
    }
  ];

  private currentContent: ProfileNavigationElementModel;

  public setCurrentContent(navigationElement: ProfileNavigationElementModel): void {
    this.currentContent = navigationElement;
  }

}

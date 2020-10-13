import { Component } from '@angular/core';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';
import { ProfileNavigationElementModel } from '../../../models/form/profile-navigation-element.model';
import { defaultUserNavigationElements, adminNavigationElements } from './navigation-elements';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  public navigationElements = defaultUserNavigationElements;
  public currentContent: ProfileNavigationElementModel;

  public user = {
    userName: localStorage.getItem('userName'),
    id: localStorage.getItem('userId')
  }

  constructor(
    private route: ActivatedRoute
  ) {
    route.data.subscribe((navigationElement: ProfileNavigationElementModel)=>{
      this.currentContent = navigationElement;
    });
  }

  public setCurrentContent(navigationElement: ProfileNavigationElementModel): void {
    this.currentContent = navigationElement;
  }

}

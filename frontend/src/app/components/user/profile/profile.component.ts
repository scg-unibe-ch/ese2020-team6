//Packages
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//Services
import { UserService } from '../../../services/user/user.service';
//Models
import { UserModel } from '../../../models/user/user.model';
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

  public userName: string;
  public userId: number;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {

    route.data.subscribe((navigationElement: ProfileNavigationElementModel)=>{
      this.currentContent = navigationElement;
    });

    if (userService.isLoggedIn) {
      userService.userObservable.subscribe((user: UserModel) => {
        this.userName = user.userName;
        this.userId = user.userId;
        if (user.isAdmin) this.navigationElements = adminNavigationElements;
      })
    }
  }

  public setCurrentContent(navigationElement: ProfileNavigationElementModel): void {
    this.currentContent = navigationElement;
  }
}

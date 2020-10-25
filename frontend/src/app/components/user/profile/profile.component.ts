//Packages
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//Services
import { UserService } from '../../../services/user/user.service';
//Models
import { UserModel } from '../../../models/user/user.model';
import { ProfileNavigationElementModel, NullProfileNavigationElement } from '../../../models/form/profile-navigation-element.model';

import { defaultUserNavigationElements, adminNavigationElements } from './navigation-elements';
import { theme } from '../../../../theme';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  public navigationElements = defaultUserNavigationElements;
  public currentContent: ProfileNavigationElementModel = new NullProfileNavigationElement();
  public userName: string;
  public userId: number;

  public theme: string = theme;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {

    if (userService.isLoggedIn) {
      userService.userObservable.subscribe((user: UserModel) => {
        this.userName = user.userName;
        this.userId = user.userId;
        if (user.isAdmin) {
          this.navigationElements = adminNavigationElements;
        }
        this.setCurrentContentOnReload();
      });
    }
  }

  private setCurrentContentOnReload(): void {
    let currentNavigationElementPath: string = this.router.url.split("/").reverse()[0];
    let currentNavigationElement: ProfileNavigationElementModel = this.navigationElements.find((element: ProfileNavigationElementModel) => element.path === currentNavigationElementPath);
    this.setCurrentContent(currentNavigationElement);
  }

  public setCurrentContent(navigationElement: ProfileNavigationElementModel): void {
    this.currentContent = navigationElement;
  }
}

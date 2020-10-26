import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import { UserModel } from '../../../models/user/user.model';
import { ProfileNavigationElementModel, NullProfileNavigationElement } from '../../../models/form/profile-navigation-element.model';
import { defaultUserNavigationElements, adminNavigationElements } from './navigation-elements';
import { ThemeService } from '../../../services/theme/theme.service';
import { Themable } from '../../../models/theme/themable';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends Themable {

  public navigationElements = defaultUserNavigationElements;
  public currentContent: ProfileNavigationElementModel = new NullProfileNavigationElement();
  public userName: string;
  public userId: number;

  constructor(
    private router: Router,
    userService: UserService,
    themeService: ThemeService
  ) {
    super(themeService);

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

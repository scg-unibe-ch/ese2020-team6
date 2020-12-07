import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../models/user/user.model';
import { ProfileNavigationElementModel, NullProfileNavigationElement } from '../../../models/user/profile/navigation-element/profile-navigation-element.model';
import { defaultUserNavigationElements, adminNavigationElements } from './navigation-elements';
import { SuccessLoader } from 'src/app/services/service.module';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public navigationElements = defaultUserNavigationElements;
  public currentContent: ProfileNavigationElementModel = new NullProfileNavigationElement();
  public userName: string;
  public userId: number;

  public showNavigationSidebar = false;

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  public ngOnInit(): void {
    this.userService.subscribe(new SuccessLoader((user: User) => {
      this.userName = user.userName;
      this.userId = user.userId;
      if (user.isAdmin) {
        this.navigationElements = adminNavigationElements;
      }
      this.setCurrentContentOnReload();
    }));
  }

  private setCurrentContentOnReload(): void {
    let currentNavigationElementPath: string = this.router.url.split('/').reverse()[0];
    let currentNavigationElement: ProfileNavigationElementModel =
    this.navigationElements.find(
      (element: ProfileNavigationElementModel) =>
      element.path === currentNavigationElementPath);
    this.setCurrentContent(currentNavigationElement);
  }

  public setCurrentContent(navigationElement: ProfileNavigationElementModel): void {
    this.currentContent = navigationElement;
  }

  public toggleNaviationSidebar(): void {
    this.showNavigationSidebar = !this.showNavigationSidebar;
  }

  get navigationClass(): string {
    return 'navigation-sidebar ' + (this.showNavigationSidebar ? 'show' : 'hidden');
  }
}

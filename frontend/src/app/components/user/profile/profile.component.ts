import { Component } from '@angular/core';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';
import { ProfileNavigationElementModel } from '../../../models/form/profile-navigation-element.model';
import { UserService } from '../../../services/user/user.service';
import { UserModel } from '../../../models/user/user.model';
import { Observable, of } from 'rxjs';
import { defaultUserNavigationElements, adminNavigationElements } from './navigation-elements';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  public navigationElements = defaultUserNavigationElements;
  public currentContent: ProfileNavigationElementModel;

  public user: UserModel;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    route.data.subscribe((navigationElement: ProfileNavigationElementModel)=>{
      this.currentContent = navigationElement;
    });
    if (userService.isLoggedIn) {
      this.user = userService.user;
      if (userService.isAdmin) this.navigationElements = adminNavigationElements;
    }
  }

  public setCurrentContent(navigationElement: ProfileNavigationElementModel): void {
    this.currentContent = navigationElement;
  }

  get userName(): Observable<string> {
    return of(this.userService.user ? this.userService.user.userName : '');
  }

  get userId(): Observable<number> {
    return of(this.userService.user ? this.userService.user.userId : null);
  }

}
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProfileNavigationElementModel } from '../../../../models/user/profile/navigation-element/profile-navigation-element.model';
@Component({
  selector: 'app-profile-navigation',
  templateUrl: './profile-navigation.component.html',
  styleUrls: ['./profile-navigation.component.scss']
})
export class ProfileNavigationComponent {

  @Input()
  public navigationElements: Array<ProfileNavigationElementModel>;

  @Output()
  navigationClickEvent = new EventEmitter<ProfileNavigationElementModel>();

  constructor(
  ) {}

  public onNavigationElementClick(navigationElement: ProfileNavigationElementModel): void {
    this.navigationClickEvent.emit(navigationElement);
  }

}

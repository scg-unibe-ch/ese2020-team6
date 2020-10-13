import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProfileNavigationElementModel } from '../../../../models/form/profile-navigation-element.model';

@Component({
  selector: 'app-profile-navigation',
  templateUrl: './profile-navigation.component.html',
  styleUrls: ['./profile-navigation.component.scss']
})
export class ProfileNavigationComponent {

  @Input()
  navigationElements;

  @Output()
  navigationClickEvent = new EventEmitter<ProfileNavigationElementModel>();

  public onNavigationElementClick(navigationElement: ProfileNavigationElementModel): void {
    this.navigationClickEvent.emit(navigationElement);
  }

}

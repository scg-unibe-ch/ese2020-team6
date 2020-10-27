import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProfileNavigationElementModel } from '../../../../models/user/profile/navigation-element/profile-navigation-element.model';
import { ThemeService } from '../../../../services/theme/theme.service';
import { Themable } from '../../../../models/theme/themable';

@Component({
  selector: 'app-profile-navigation',
  templateUrl: './profile-navigation.component.html',
  styleUrls: ['./profile-navigation.component.scss']
})
export class ProfileNavigationComponent extends Themable{

  @Input()
  public navigationElements: Array<ProfileNavigationElementModel>;

  @Output()
  navigationClickEvent = new EventEmitter<ProfileNavigationElementModel>();

  constructor(
    themeService: ThemeService
  ) {
    super(themeService);
  }

  public onNavigationElementClick(navigationElement: ProfileNavigationElementModel): void {
    this.navigationClickEvent.emit(navigationElement);
  }

}

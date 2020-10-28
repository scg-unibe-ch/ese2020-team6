import { Component, Input } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { UserModel } from '../../../models/user/user.model';
import { Themable } from '../../../models/theme/themable';
import { ThemeService } from '../../../services/theme/theme.service';


@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent extends Themable {
  private showDropdown: boolean = false;
  private newReload: boolean = true;

  public userName: string;
  public isLoggedIn: boolean = false;

  @Input()
  block: boolean = false;

  @Input()
  isHome: boolean = false;

  constructor(
    userService: UserService,
    themeService: ThemeService
  ) {
    super(themeService);

    if(userService.isLoggedIn) {
        userService.userObservable.subscribe((user: UserModel) => {
        this.isLoggedIn = true;
        this.userName = user.userName;
      })
    }
  }

  private toggleDropDown(): void {
    this.showDropdown = !this.showDropdown;
    this.newReload = false;
  }

  public getDropdownClasses(): Array<string> {
    let classes: Array<string> = new Array<string>();
    classes.push(!this.showDropdown ? 'collapse' : 'expand');
    if (this.newReload) classes.push('land');
    classes.push(this.theme);
    return classes;
  }
}

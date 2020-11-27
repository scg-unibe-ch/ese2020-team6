import { Component, Input } from '@angular/core';
import { LoginUserService } from '../../../services/user/login/login-user.service';
import { UserModel } from '../../../models/user/user.model';


@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent {
  private showDropdown = false;
  private newReload = true;

  public userName: string;
  public isLoggedIn = false;

  @Input()
  block = false;

  @Input()
  isHome = false;

  constructor(
    public loginUserService: LoginUserService
  ) {
    // this.userService.events.onLoad((user: UserModel) => {
    //   this.isLoggedIn = true;
    //   this.userName = user.userName;
    // }, (err: any) => {});
  }

  toggleDropDown(): void {
    this.showDropdown = !this.showDropdown;
    this.newReload = false;
  }

  public getDropdownClasses(): Array<string> {
    const classes: Array<string> = new Array<string>();
    classes.push(!this.showDropdown ? 'collapse' : 'expand');
    if (this.newReload) { classes.push('land'); }
    return classes;
  }

  public getClasses(): Array<string> {
    const classes: Array<string> = new Array<string>();
    classes.push(this.block ? 'block' : 'fix');
    return classes;
  }
}

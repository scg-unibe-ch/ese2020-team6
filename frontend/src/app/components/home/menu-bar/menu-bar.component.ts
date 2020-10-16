//Packages
import { Component } from '@angular/core';
//Services
import { UserService } from '../../../services/user/user.service';
//Models
import { UserModel } from '../../../models/user/user.model';


@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent {
  private showDropdown: boolean = false;
  private newReload: boolean = true;

  public userName: string;
  public isLoggedIn: boolean = false;

  constructor(
    private userService: UserService
  ) {
    if(userService.isLoggedIn()) {
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
}

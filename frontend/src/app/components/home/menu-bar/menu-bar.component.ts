import { Component } from '@angular/core';
import { UserService } from '../../../services/user/user.service';


@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent {
  private showDropdown: boolean = false;
  private newReload: boolean = true;

  constructor(
    private userService: UserService
  ) { }

  toggleDropDown(): void {
    this.showDropdown = !this.showDropdown;
    this.newReload = false;
  }

  get userName(): string {
    return this.userService.user.userName;
  }

  get isLoggedIn(): boolean {
    return this.userService.isLoggedIn;
  }
}

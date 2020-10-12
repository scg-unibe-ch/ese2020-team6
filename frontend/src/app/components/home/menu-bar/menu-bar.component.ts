import { Component } from '@angular/core';


@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent {
  private showDropdown: boolean = false;
  private newReload: boolean = true;

  toggleDropDown(): void {
    this.showDropdown = !this.showDropdown;
    this.newReload = false;
  }

  get userName(): string {
    return localStorage.getItem('userName');
  }

  get isLoggedIn(): boolean {
      return localStorage.getItem('userToken') ? true : false;
  }

  get isAdmin(): boolean {
    return JSON.parse(localStorage.getItem('isAdmin'));
  }

  getUserName(): string {
    return localStorage.getItem('userName');
  }

}

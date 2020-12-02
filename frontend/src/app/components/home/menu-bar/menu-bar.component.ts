import { Component, Input } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user/user.model';
import { SuccessLoader } from 'src/app/services/service.module';


@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent {
  private showDropdown = false;
  private newReload = true;

  public userName: string;

  @Input()
  public position: string;

  @Input()
  public isHome = false;
  private successLoader = new SuccessLoader<User>((user: User) => this.userName = user.userName);

  constructor(
    public userService: UserService
  ) {
    this.userService.subscribe(this.successLoader)
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
    classes.push(this.position ? this.position : '');
    return classes;
  }
}

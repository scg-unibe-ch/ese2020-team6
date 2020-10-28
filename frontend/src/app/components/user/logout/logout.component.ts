import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import { Themable } from '../../../models/theme/themable';
import { ThemeService } from '../../../services/theme/theme.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent extends Themable {

  constructor(
    private router: Router,
    private userService: UserService,
    themeService: ThemeService
  ) {
    super(themeService);
  }

  public onSubmit(): void { 
    this.userService.logout();
  }
}

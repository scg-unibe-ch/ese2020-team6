import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUserService } from '../../../services/user/login/login-user.service';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent{

  constructor(
    private router: Router,
    private loginUserService: LoginUserService,
  ) {}

  public onSubmit(): void {
    this.loginUserService.logout();
  }
}

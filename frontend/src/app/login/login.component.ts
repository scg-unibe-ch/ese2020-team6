import { Component } from '@angular/core';
import { LoginUser } from '../models/login-user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginUser: LoginUser = new LoginUser();

  click() {
    console.log(this.loginUser);
  }
}

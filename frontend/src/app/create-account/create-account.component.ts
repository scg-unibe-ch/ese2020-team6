import { Component } from '@angular/core';
import { RegisterUser } from '../models/register-user.model';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {

  registerUser: RegisterUser = new RegisterUser();

  click() {
    console.log(this.registerUser);
  }
}

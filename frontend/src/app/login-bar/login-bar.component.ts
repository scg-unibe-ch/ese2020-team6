import { Component, OnInit } from '@angular/core';
//import { UserAttributes, User } from './../../../../backend/src/models/user.model';

@Component({
  selector: 'app-login-bar',
  templateUrl: './login-bar.component.html',
  styleUrls: ['./login-bar.component.css']
})
export class LoginBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  isLoggedIn(): boolean {
      return localStorage.getItem('userToken') ? true : false;
  }

  isAdmin(): boolean {
    return JSON.parse(localStorage.getItem('isAdmin'));
  }

  getUserName(): string {
    return localStorage.getItem('userName');
  }

}

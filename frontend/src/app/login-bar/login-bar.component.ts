import { Component, OnInit } from '@angular/core';

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

  getUserName(): string {
    return localStorage.getItem('userName');
  }

}

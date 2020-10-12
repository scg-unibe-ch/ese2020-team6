import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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

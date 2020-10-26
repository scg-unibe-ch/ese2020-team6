import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user/user.service';
import { UserModel, NullUser } from '../../../../models/user/user.model';
import { theme } from '../../../../../theme';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  public user: UserModel = new NullUser();

  public theme: string = theme;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.userObservable.subscribe((user: UserModel) => {
      this.user = user;
    })
  }

}

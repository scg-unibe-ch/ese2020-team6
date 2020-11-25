import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user/user.service';
import { UserModel, NullUser } from '../../../../models/user/user.model';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  public picture: string;
  public user: UserModel = new NullUser();

  constructor(
    private userService: UserService,
  ) {}

  public ngOnInit(): void {
    this.userService.events.onLoad((user: UserModel) => {
      this.user = user;
      this.picture = user.picture;
    });
  }

}

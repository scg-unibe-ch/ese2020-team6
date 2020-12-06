import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user/user.service';
import { UserModel, User } from '../../../../models/user/user.model';
import { SuccessLoader } from 'src/app/services/service.module';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  public endpointUrl = environment.endpointURL;

  public picture: string;
  public user: UserModel = User.NullUser;

  constructor(
    private userService: UserService,
  ) {}

  public ngOnInit(): void {
    this.userService.subscribe(new SuccessLoader((user: UserModel) => {
      this.user = user;
      this.picture = user.picture;
    }));
  }

}

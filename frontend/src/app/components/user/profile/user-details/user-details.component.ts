import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user/user.service';
import { User, NullUser } from '../../../../models/user/user.model';
import { SuccessLoader } from 'src/app/services/service.module';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  public user: User = NullUser.instance();

  constructor(
    private userService: UserService,
  ) {}

  public ngOnInit(): void {
    this.userService.subscribe(new SuccessLoader((user: User) => {
      this.user = user;
    }));
  }

}

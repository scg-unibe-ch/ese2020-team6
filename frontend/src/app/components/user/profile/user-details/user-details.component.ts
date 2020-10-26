import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user/user.service';
import { UserModel, NullUser } from '../../../../models/user/user.model';
import { ThemeService } from '../../../../services/theme/theme.service';
import { Themable } from '../../../../models/theme/themable';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent extends Themable implements OnInit {

  public user: UserModel = new NullUser();

  constructor(
    private userService: UserService,
    themeService: ThemeService
  ) {
    super(themeService);
  }

  ngOnInit(): void {
    this.userService.userObservable.subscribe((user: UserModel) => {
      this.user = user;
    })
  }

}

import { Component, OnInit} from '@angular/core';
import { PopupComponent } from '../../../../../../models/user/profile/navigation/popup/popup.interface';
import { UserModel } from '../../../../../../models/user/user.model';
import { ProductService } from '../../../../../../services/product/product.service';
import { UserService } from '../../../../../../services/user/user.service';
import { ThemeService } from '../../../../../../services/theme/theme.service';
import { Themable } from '../../../../../../models/theme/themable';

@Component({
  selector: 'app-popup-rejected',
  templateUrl: '../popup.component.html',
  styleUrls: ['../popup.component.scss']
})
export class PopupRejectedComponent extends Themable implements PopupComponent, OnInit{

  public popupNumber: number;
  public popupDisplay: boolean = false;

  constructor(
    private productService: ProductService,
    private userService: UserService,
    themeService: ThemeService
  ) {
    super(themeService);
  }

  public ngOnInit(): void {
    this.userService.userObservable.subscribe((user: UserModel) => {
      this.productService.getMyRejectedProductsCount(user.userId).subscribe((count: number) => {
        this.popupNumber = count;
        this.popupDisplay = (count != 0);
      });

    })
  }

}

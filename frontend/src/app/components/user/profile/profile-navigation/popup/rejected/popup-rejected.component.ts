import { Component, OnInit} from '@angular/core';
import { PopupComponent } from '../../../../../../models/user/profile/navigation/popup/popup.interface';
import { UserModel } from '../../../../../../models/user/user.model';
import { ProductService } from '../../../../../../services/product/product.service';
import { UserService } from '../../../../../../services/user/user.service';
import { theme } from '../../../../../../../theme';

@Component({
  selector: 'app-popup-rejected',
  templateUrl: '../popup.component.html',
  styleUrls: ['../popup.component.scss']
})
export class PopupRejectedComponent implements PopupComponent, OnInit{

  public theme: string = theme;

  public popupNumber: number;
  public popupDisplay: boolean = false;

  constructor(
    private productService: ProductService,
    private userService: UserService
  ) { }

  public ngOnInit(): void {
    this.userService.userObservable.subscribe((user: UserModel) => {
      this.productService.getMyRejectedProductsCount(user.userId).subscribe((count: number) => {
        this.popupNumber = count;
        this.popupDisplay = (count != 0);
      });

    })
  }

}

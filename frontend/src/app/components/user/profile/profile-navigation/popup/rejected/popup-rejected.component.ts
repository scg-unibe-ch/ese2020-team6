import { Component, OnInit} from '@angular/core';
import { PopupComponent } from '../../../../../../models/user/profile/navigation/popup/popup.interface';
import { User } from '../../../../../../models/user/user.model';
import { ProductService } from '../../../../../../services/product/product.service';
import { UserService } from '../../../../../../services/user/user.service';
import { SuccessLoader } from 'src/app/services/service.module';

@Component({
  selector: 'app-popup-rejected',
  templateUrl: '../popup.component.html',
  styleUrls: ['../popup.component.scss']
})
export class PopupRejectedComponent implements PopupComponent, OnInit{

  public popupNumber: number;
  public popupDisplay = false;

  constructor(
    private productService: ProductService,
    private userService: UserService,
  ) {}

  public ngOnInit(): void {
    this.userService.subscribe(new SuccessLoader((user: User) => {
      this.productService.getMyRejectedProductsCount(user.userId).subscribe((count: number) => {
        this.popupNumber = count;
        this.popupDisplay = (count !== 0);
      });
    }));
  }

}

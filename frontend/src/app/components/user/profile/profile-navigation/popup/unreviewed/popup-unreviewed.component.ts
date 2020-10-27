import { Component, OnInit} from '@angular/core';
import { PopupComponent } from '../../../../../../models/user/profile/navigation/popup/popup.interface';
import { ProductService } from '../../../../../../services/product/product.service';
import { ThemeService } from '../../../../../../services/theme/theme.service';
import { Themable } from '../../../../../../models/theme/themable';

@Component({
  selector: 'app-popup-unreviewed',
  templateUrl: '../popup.component.html',
  styleUrls: ['../popup.component.scss']
})
export class PopupUnreviewedComponent extends Themable implements PopupComponent, OnInit {

  public popupNumber: number;
  public popupDisplay: boolean = false;

  constructor(
    private productService: ProductService,
    themeService: ThemeService
  ) {
    super(themeService);
  }

  public ngOnInit(): void {
    this.productService.getUnreviewedProductsCount().subscribe((count: number) => {
      this.popupNumber = count;
      this.popupDisplay = (count != 0);
    });
  }

}

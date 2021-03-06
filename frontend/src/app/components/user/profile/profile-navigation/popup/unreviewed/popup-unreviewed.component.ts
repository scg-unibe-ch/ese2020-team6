import { Component, OnInit} from '@angular/core';
import { PopupComponent } from '../../../../../../models/user/profile/navigation/popup/popup.interface';
import { ProductService } from '../../../../../../services/product/product.service';

@Component({
  selector: 'app-popup-unreviewed',
  templateUrl: '../popup.component.html',
  styleUrls: ['../popup.component.scss']
})
export class PopupUnreviewedComponent implements PopupComponent, OnInit {

  public popupNumber: number;
  public popupDisplay = false;

  constructor(
    private productService: ProductService
  ) {}

  public ngOnInit(): void {
    this.productService.getUnreviewedProductsCount().subscribe((count: number) => {
      this.popupNumber = count;
      this.popupDisplay = (count !== 0);
    });
  }

}

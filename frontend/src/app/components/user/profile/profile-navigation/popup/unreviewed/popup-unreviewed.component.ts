import { Component, OnInit} from '@angular/core';
import { PopupComponent } from '../../../../../../models/user/profile/navigation/popup/popup.interface';
import { ProductService } from '../../../../../../services/product/product.service';
import { theme } from '../../../../../../../theme';

@Component({
  selector: 'app-popup-unreviewed',
  templateUrl: '../popup.component.html',
  styleUrls: ['../popup.component.scss']
})
export class PopupUnreviewedComponent implements PopupComponent, OnInit {

  public theme: string = theme;

  public popupNumber: number;
  public popupDisplay: boolean = false;

  constructor(
    private productService: ProductService
  ) { }

  public ngOnInit(): void {
    this.productService.getUnreviewedProductsCount().subscribe((count: number) => {
      this.popupNumber = count;
      this.popupDisplay = (count != 0);
    });
  }

}

import { Component, Input } from '@angular/core';
import { ProductModel } from '../../../../../models/product/product.model';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent {

  @Input()
  path = '';

  @Input()
  products: Array<ProductModel>;

  private displayList = true;

  public switchView(): void {
    this.displayList = !this.displayList;
  }

  get isList(): boolean {
    return this.displayList;
  }

}

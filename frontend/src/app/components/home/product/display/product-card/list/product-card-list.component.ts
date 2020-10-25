import { Component} from '@angular/core';
import { ProductCardComponent } from '../product-card.component';

@Component({
  selector: 'app-product-card-list',
  templateUrl: './product-card-list.component.html',
  styleUrls: ['./product-card-list.component.scss']
})
export class ProductCardListComponent extends ProductCardComponent {

}

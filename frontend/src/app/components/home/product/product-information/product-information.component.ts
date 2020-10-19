// Packages
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
// Services
import { ProductService } from '../../../../services/product/product.service';
import { UserService } from '../../../../services/user/user.service';
// Models
//import { ProductModel } from '../../../../models/product/product.model'; implemented in other branch


@Component({
  selector: 'app-product-information',
  templateUrl: './product-information.component.html',
  styleUrls: ['./product-information.component.scss']
})
export class ProductInformationComponent implements OnInit {

  //public product: ProductModel; implemented in other branch
  public product: any = {};
  public isNotCreator: boolean = false;

  statusIndicatorPillColorClass: () => string = () => {
    let status: string = this.product.status;
    if (status) {
      if (status === 'Available') return 'success';
      else if (status === 'Sold' || status === 'Lent') return 'warn';
    } else return '';
  }

  deliverableIndicatorPillColorClass: () => string = () => {
    let deliverable: boolean = this.product.deliverable;
    if (deliverable == true || deliverable == false) {
      if (deliverable) return 'success';
      else return 'warn';
    } else return '';
  }

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private userService: UserService
  ) {
   }

   public ngOnInit(): void {
     this.route.params.subscribe((params: {productId: string}) => {
         this.productService.get(parseInt(params.productId, 10)).subscribe((product: any) => {
           this.product = product;
         });
       });
   }

  get isForSale(): boolean {
    return this.product.offerType === 'Sell';
  }

  //remove later (for demo)
  toggleCreator() {
    this.isNotCreator = !this.isNotCreator;
  }
}

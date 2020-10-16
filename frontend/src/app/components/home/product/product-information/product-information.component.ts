// Packages
import { Component } from '@angular/core';
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
export class ProductInformationComponent {

  //public product: ProductModel; implemented in other branch
  public title: string;
  public description: string;
  public offerType: string;
  public picture: string;
  public productType: string;
  public price: string;
  public location: string;
  public category: string;
  public deliverable: string;
  public status: string;
  public isNotCreator: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private userService: UserService
  ) {
    this.route.params.subscribe((params: {productId: string}) => {
        productService.get(parseInt(params.productId, 10)).subscribe((product: any) => {
          this.title = product.title;
          this.description = product.description;
          this.offerType = product.offerType;
          this.picture = product.picture;
          this.productType = product.productType;
          this.price = product.price;
          this.location = product.location;
          this.category = product.category;
          this.deliverable = product.deliverable;
          this.status = product.status;
        });
      });
   }

  get statusPillColorClass(): string {
    return this.status === 'Available' ? 'success' : (this.status === 'Sold' || this.status === 'Lent' ? 'warn' : '');
  }

  get deliverablePillColorClass(): string {
    return this.deliverable ? 'success' : 'warn';
  }

  detailsPillColorClass(pillContent: string): string {
    return pillContent ? 'faded' : 'fainted';
  }

  get isForSale(): boolean {
    return this.offerType === 'Sell';
  }

  //remove later (for demo)
  toggleCreator() {
    this.isNotCreator = !this.isNotCreator;
  }
}

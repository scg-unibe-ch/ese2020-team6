import {Overlay, OverlayConfig, OverlayModule} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Component, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../services/product/product.service';
import { UserService } from '../../../../services/user/user.service';
// Models
import { ProductModel, NullProduct } from '../../../../models/product/product.model';
import { CutUserModel, NullCutUser } from '../../../../models/user/cut-user.model';
import { UserModel, NullUser } from '../../../../models/user/user.model';


@Component({
  selector: 'app-product-information',
  templateUrl: './product-information.component.html',
  styleUrls: ['./product-information.component.scss']
})
export class ProductInformationComponent implements OnInit {
  @Input() isPreview = false;
  id: number;
  productId: any;
  private overlayRef: any;

  public product: ProductModel = new NullProduct();
  public creator: CutUserModel = new NullCutUser();
  public currentUser: UserModel = new NullUser();

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
    private userService: UserService,
    private router: Router,
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef
  ) { }

   public ngOnInit(): void {
     this.route.params.subscribe((params: {productId: string}) => {
       this.getProduct(parseInt(params.productId, 10));
     });
   }

  private getProduct(productId: number): void {
    this.productService.getProductById(productId).subscribe((product: any) => {
      this.product = product;
      this.getCreator(product.userId);
    });
  }

  private getCreator(creatorId: number) {
    this.userService.getUserById(creatorId).subscribe((cutUser: CutUserModel) => {
      this.creator = cutUser;
      if (this.userService.isLoggedIn) {
        this.getCurrentUser();
      }
    });
  }

  private getCurrentUser() {
      this.userService.userObservable.subscribe((currentUser: UserModel) => {
        this.currentUser = currentUser;
      });
  }

  get priceLabel(): string {
    if (this.product.productType === 'Service' || this.product.offerType === 'Rent') return '$/h';
    else return '$';
  }

  public deleteProduct(): void {
    this.productService.deleteProduct(this.productId).subscribe(
      product => console.log(product));
    this.router.navigate(['/user/profile/myproducts']);
    this.overlayRef.dispose();
  }

  public openWithTemplate(tpl: TemplateRef<any>) {
    const configs = new OverlayConfig({
     hasBackdrop: true,
     });
    configs.positionStrategy = this.overlay.position()
     .global()
     .centerHorizontally()
     .centerVertically();
    const overlayRef = this.overlay.create(configs);
    this.overlayRef = overlayRef;
    overlayRef.attach(new TemplatePortal(tpl, this.viewContainerRef));
  }

  get isNotCreator(): boolean {
    if (this.currentUser.userId == this.creator.userId) return false;
    return true;
  }

  public doNothing(tplClose: TemplateRef<any>) {
        this.overlayRef.dispose();
  }
}

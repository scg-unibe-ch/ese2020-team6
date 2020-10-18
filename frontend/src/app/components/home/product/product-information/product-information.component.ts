import {Overlay, OverlayConfig, OverlayModule} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Component, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../services/product/product.service';
// Models
//import { ProductModel } from '../../../../models/product/product.model'; implemented in other branch


@Component({
  selector: 'app-product-information',
  templateUrl: './product-information.component.html',
  styleUrls: ['./product-information.component.scss']
})
export class ProductInformationComponent implements OnInit {
  @Input() data: any;
  @Input() isPreview = false;
  id: number;
  productId: any;
  productService: ProductService;
  overlayRef: any;

  //public product: ProductModel; implemented in other branch
  public product: any = {};
  public isNotCreator: boolean = false;

  constructor(
    private route: ActivatedRoute,
    productService: ProductService,
    private router: Router,
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef
    ) {
    this.productService = productService;
   }

   public ngOnInit(): void {
     this.route.params.subscribe((params: {productId: string}) => {
         this.productService.get(parseInt(params.productId, 10)).subscribe((product: any) => {
           this.product = product;
           this.productId = product.productId;
         });
       });
   }


 get statusPillColorClass(): string {
   return this.product.status === 'Available' ? 'success' :
   (this.product.status === 'Sold' || this.product.status === 'Lent' ? 'warn' : '');
 }

 get deliverablePillColorClass(): string {
   return this.product.deliverable ? 'success' : 'warn';
 }

 detailsPillColorClass(pillContent: string): string {
   return pillContent ? 'faded' : 'fainted';
 }

 get isForSale(): boolean {
   return this.product.offerType === 'Sell';
 }

 // remove later (for demo)
 toggleCreator() {
   this.isNotCreator = !this.isNotCreator;
  }

  deleteProduct(): void {
    this.productService.deleteProduct(this.productId).subscribe(
      product => console.log(product));
    this.router.navigate(['/user/profile/myproducts']);
    this.overlayRef.dispose();
  }

  openWithTemplate(tpl: TemplateRef<any>) {
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

  doNothing(tplClose: TemplateRef<any>) {
    this.overlayRef.dispose();
  }
}

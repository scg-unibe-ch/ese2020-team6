import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product/product.service';
import { ProductModel } from '../../../models/product/product.model';
import { getResolvedURL } from '../../helper';

@Injectable({
  providedIn: 'root'
})
export class CheckoutGuard implements CanActivate {

  constructor(
    private router: Router,
    private productService: ProductService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let productId: number = next.params.productId;

    this.productService.getProductById(productId).subscribe((product: ProductModel) => {
      switch (product.productType) {
        case 'Item':
          switch (product.offerType) {
            case 'Sell':
              this.router.navigate([getResolvedURL(next), 'buy-item']); break;
            case 'Rent':
              //this.router.navigate([getResolvedURL(next), 'rent-item']);
              break;
          }; break;
        case 'Service':
          //this.router.navigate([getResolvedURL(next), 'purchase-service']);
          break;
      }
    });
    return true;
  }

}

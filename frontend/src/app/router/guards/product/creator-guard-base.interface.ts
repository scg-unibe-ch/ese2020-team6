import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { pluck, map,  mergeMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import { UserModel } from '../../../models/user/user.model';
import { ProductService } from '../../../services/product/product.service';
import { ProductModel } from 'src/app/models/product/product.model';

export abstract class CreatorGuardBase implements CanActivate {

  constructor(
    private router: Router,
    private userService: UserService,
    private productService: ProductService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userService.getSource().pipe(mergeMap((user: UserModel) => {
      const productId: number = parseInt(next.parent.params.productId, 10);
      return this.productService.getProductById(productId)
      .pipe(map((product: ProductModel) => {
        return this.needsNoRedirect(product.sellerId, user.userId) ? true : this.redirect(next, state);
      }, catchError((error: any) => of(false))))
    }))
  }

  private needsNoRedirect(creatorId: number, currentUserId: number): boolean {
    return (this.creatorNeedsToMatchCurrentUser() && (creatorId == currentUserId)) ||
           !(this.creatorNeedsToMatchCurrentUser() || (creatorId == currentUserId));
  }

  abstract creatorNeedsToMatchCurrentUser(): boolean;

  protected redirect(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): UrlTree {
    let pathSegmentArray: Array<string> = state.url.split("/").reverse();
    pathSegmentArray[0] = next.data.canActivate.destination;
    return this.router.parseUrl(pathSegmentArray.reverse().join("/"))
  }

}

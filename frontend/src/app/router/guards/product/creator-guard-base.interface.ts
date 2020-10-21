import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of, concat } from 'rxjs';
import { pluck, map,  mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import { ProductService } from '../../../services/product/product.service';

export abstract class CreatorGuardBase implements CanActivate {

  constructor(
    private router: Router,
    private userService: UserService,
    private productService: ProductService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.userService.isLoggedIn) {
      const productId: number = parseInt(next.parent.params.productId, 10);
      const creatorIdObservable = this.productService.getProductById(productId).pipe(pluck('userId'));
      const currentUserIdObservable = this.userService.userObservable.pipe(pluck('userId'));

      const isCreatorOrNotObservable: Observable<boolean> = creatorIdObservable.pipe(
        mergeMap((creatorId: number) => currentUserIdObservable.pipe(
          map((currentUserId: number) => this.needsNoRedirect(creatorId, currentUserId))
        ))
      );
      isCreatorOrNotObservable.subscribe((needsNoRedirect: boolean) => {
        if (!needsNoRedirect) {
          this.redirect(next, state);
        }
      })
      return isCreatorOrNotObservable;
    } else {
      return true;
    }
  }

  private needsNoRedirect(creatorId: number, currentUserId: number): boolean {
    return (this.creatorNeedsToMatchCurrentUser() && (creatorId == currentUserId)) ||
           !(this.creatorNeedsToMatchCurrentUser() || (creatorId == currentUserId));
  }

  abstract creatorNeedsToMatchCurrentUser(): boolean;

  protected redirect(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): void {
    let pathSegmentArray: Array<string> = state.url.split("/").reverse();
    pathSegmentArray[0] = next.data.canActivate.destination;
    this.router.navigate([pathSegmentArray.reverse().join("/")])
  }

}

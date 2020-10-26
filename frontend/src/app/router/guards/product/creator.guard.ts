import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import { ProductService } from '../../../services/product/product.service';
import { CreatorGuardBase } from './creator-guard-base.interface';

@Injectable({
  providedIn: 'root'
})
export class NotCreatorGuard extends CreatorGuardBase {

  constructor(
    router: Router,
    userService: UserService,
    productService: ProductService
  ) {
    super(router, userService, productService)
  }

  creatorNeedsToMatchCurrentUser(): boolean {return false;}
}

@Injectable({
  providedIn: 'root'
})
export class CreatorGuard extends CreatorGuardBase {

  constructor(
    router: Router,
    userService: UserService,
    productService: ProductService
  ) {
    super(router, userService, productService)
  }

  creatorNeedsToMatchCurrentUser(): boolean {return true;}
}

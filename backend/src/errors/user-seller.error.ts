import { ProductAttributes } from '../models/product.model';

export class UserIsNotSellerError extends Error {
  constructor(product: ProductAttributes) {
    super('User is not the seller of the product with id ' + product.productId + '!');
  }
}

export class UserIsSellerError extends Error {
  constructor(product: ProductAttributes) {
    super('User is the seller of the product with id ' + product.productId + '!');
  }
}

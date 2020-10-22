// Packages
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// Services
import { PostProductService } from './post/post-product.service';
import { GetProductService } from './get/get-product.service';
import { ReviewProductService } from './review/review-product.service';
import { EditProductService } from './edit/edit-product.service';
// Models
import { ProductModel } from '../../models/product/product.model';
import {
  AcceptProductResponseModel,
  RejectProductResponseModel,
  UpdateProductResponseModel,
  PostProductResponseModel,
  DeleteProductResponseModel } from '../../models/response/product/product-response-model.module';
// Interfaces
import {
  PostProductRequestBuilder,
  UpdateProductRequestBuilder,
  AcceptProductRequestBuilder,
  RejectProductRequestBuilder } from '../../models/request/product/product-request-builder.module';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private postProductService: PostProductService,
    private getProductService: GetProductService,
    private reviewProductService: ReviewProductService,
    private editProductService: EditProductService
  ) { }

  public getAllProducts(): Observable<Array<ProductModel>> {
    return this.getProductService.getAllProducts();
  }

  public getAllUnapprovedProducts(): Observable<Array<ProductModel>> {
    return this.getProductService.getAllUnapprovedProducts();
  }

  public getMyProducts(userId: number): Observable<Array<ProductModel>> {
    return this.getProductService.getMyProducts(userId);
  }

  public getProductById(productId: number): Observable<ProductModel> {
    return this.getProductService.getProductById(productId);
  }

  public postProduct(requestBuilder: PostProductRequestBuilder): Observable<PostProductResponseModel> {
    return this.postProductService.postProduct(requestBuilder);
  }

  public deleteProduct(productId: number): Observable<DeleteProductResponseModel> {
    return this.editProductService.deleteProduct(productId);
  }

  public updateProduct(requestBuilder: UpdateProductRequestBuilder): Observable<UpdateProductResponseModel> {
    return this.editProductService.updateProduct(requestBuilder);
  }

  public acceptProduct(requestBuilder: AcceptProductRequestBuilder): Observable<AcceptProductResponseModel> {
    return this.reviewProductService.acceptProduct(requestBuilder);
  }

  public rejectProduct(requestBuilder: RejectProductRequestBuilder): Observable<RejectProductResponseModel> {
    return this.reviewProductService.rejectProduct(requestBuilder);
  }
}

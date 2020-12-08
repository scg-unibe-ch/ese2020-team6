import { Categories } from '../../models/category/category.module';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostProductService } from './post/post-product.service';
import { GetProductService } from './get/get-product.service';
import { ReviewProductService } from './review/review-product.service';
import { EditProductService } from './edit/edit-product.service';
import { ProductModel, Product } from '../../models/product/product.model';
import {
  AcceptProductResponseModel,
  RejectProductResponseModel,
  UpdateProductResponseModel,
  PostProductResponseModel,
  DeleteProductResponseModel } from '../../models/response/response.module';
import {
  PostProductRequestBuilder,
  UpdateProductRequestBuilder,
  AcceptProductRequestBuilder,
  RejectProductRequestBuilder } from 'src/app/models/request/request.module';
import { Search } from 'src/app/models/search/search.model';
import { Products } from 'src/app/models/product/products.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private postProductService: PostProductService,
    private getProductService: GetProductService,
    private reviewProductService: ReviewProductService,
    private editProductService: EditProductService,
  ) { }

  public getAllProducts(): Observable<Products> {
    return this.getProductService.getAllProducts();
  }

  public getAllAcceptedProducts(): Observable<Products> {
    return this.getProductService.getAllAcceptedProducts();
  }

  public getMyRejectedProducts(userId: number): Observable<Products> {
    return this.getProductService.getMyRejectedProducts(userId);
  }

  public getAllUnreviewedProducts(): Observable<Products> {
    return this.getProductService.getAllUnreviewedProducts();
  }

  public getMyProducts(userId: number): Observable<Products> {
    return this.getProductService.getMyProducts(userId);
  }

  public getProductById(productId: number): Observable<Product> {
    return this.getProductService.getProductById(productId);
  }

  public getMyRejectedProductsCount(userId: number): Observable<number> {
    return this.getProductService.getMyRejectedProductsCount(userId);
  }

  public getUnreviewedProductsCount(): Observable<number> {
    return this.getProductService.getUnreviewedProductsCount();
  }

  public postProduct(requestBuilder: PostProductRequestBuilder): Observable<PostProductResponseModel> {
    return this.postProductService.postProduct(requestBuilder);
  }

  public deleteProduct(productId: number): Observable<DeleteProductResponseModel> {
    return this.editProductService.deleteProduct(productId);
  }

  public updateProduct(requestBuilder: UpdateProductRequestBuilder, productId: number): Observable<UpdateProductResponseModel> {
    return this.editProductService.updateProduct(requestBuilder, productId);
  }

  public acceptProduct(requestBuilder: AcceptProductRequestBuilder): Observable<AcceptProductResponseModel> {
    return this.reviewProductService.acceptProduct(requestBuilder);
  }

  public rejectProduct(requestBuilder: RejectProductRequestBuilder): Observable<RejectProductResponseModel> {
    return this.reviewProductService.rejectProduct(requestBuilder);
  }

  public getCategories(): Observable<Categories> {
    return this.getProductService.getCategories();
  }

  public static filter(products: Products, filter: Search): Products {
    return new Products(products.products.filter((product: Product) => {
      return filter.filter(product);
    }));
  }
}

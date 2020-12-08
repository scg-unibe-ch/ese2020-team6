import { ProductResponseModel, ProductResponse } from './product-response.model';

export interface ProductsResponseModel extends Array<ProductResponseModel>{}


export class ProductsResponse extends Array<ProductResponse> implements ProductsResponseModel {

  static isProductsResponseModel(products: ProductsResponseModel): products is ProductsResponseModel {
    if (Array.isArray(products)) {

      let productsCheck = products.map(
        (product: ProductResponseModel) => {
          return ProductResponse.isProductResponseModel(product)
        }
      )

      return !(productsCheck.includes(false));
    } else return false;
  }
}

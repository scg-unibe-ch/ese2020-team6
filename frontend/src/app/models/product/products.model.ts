import { ProductResponseModel, ProductsResponseModel } from '../response/response.module';
import { Product, ProductModel } from './product.model';

export interface ProductsModel {
  products: Array<Product>;
}

export class Products implements ProductsModel, IterableIterator<Product> {

  constructor(
    public products: Array<Product>
  ) { }

  public next(): IteratorResult<Product> {
    return this.products[Symbol.iterator]().next();
  }
  [Symbol.iterator](): IterableIterator<Product> {
    return this.products[Symbol.iterator]();
  }
  public map(callback: (currentValue: Product, index?: number, array?: Array<Product>) => any, thisArg?: any): Array<any> {
    if (thisArg) return this.products.map(callback, thisArg);
    else return this.products.map(callback);
  }

  public static buildFromProductModels(products: Array<ProductModel>): Products {
    return new Products(products.map((product: ProductModel) => {
      return Product.buildFromProductModel(product);
    }));
  }

  public static buildFromProductsResponseModel(products: ProductsResponseModel): Products {
    if (!(products instanceof Products)) {
      return new Products(
        Products.buildProductsArray(products)
      )
    } else return products;
  }

  private static buildProductsArray(products: Array<ProductResponseModel>): Array<Product> {
    return products.map((product: ProductResponseModel) => Product.buildFromProductResponseModel(product));
  }
}

export class NullProducts extends Products {
  private static _instance: NullProducts;

  constructor() {
    super(new Array<Product>());
  }

  public static instance(): NullProducts {
    if (!NullProducts._instance) NullProducts._instance = new NullProducts();
    return NullProducts._instance;
  }

}

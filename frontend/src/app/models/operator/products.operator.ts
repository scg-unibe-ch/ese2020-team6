import { OperatorFunction} from 'rxjs';
import { transformator } from './transformator';
import { Products } from '../product/products.model';
import { ProductsResponseModel, ProductsResponse } from '../response/response.module';

export function transformProducts<T>(): OperatorFunction<any, any> {
  return transformator<ProductsResponseModel, T>(Products.buildFromProductsResponseModel, ProductsResponse.isProductsResponseModel);
}

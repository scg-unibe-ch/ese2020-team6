import { OperatorFunction} from 'rxjs';
import { transformator } from './transformator';
import { Product } from '../product/product.model';
import { ProductResponseModel, ProductResponse } from '../response/response.module';

export function transformProduct<T>(): OperatorFunction<any, any> {
  return transformator<ProductResponseModel, T>(Product.buildFromProductResponseModel, ProductResponse.isProductResponseModel);
}

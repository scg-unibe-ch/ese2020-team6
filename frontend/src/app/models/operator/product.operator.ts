import { OperatorFunction} from 'rxjs';
import { transformator } from './transformator';
import { ProductModel, Product } from '../product/product.model';

export function transformProduct<T>(): OperatorFunction<any, any> {
  return transformator<ProductModel, T>(Product.buildFromProductModel, Product.isProductModel);
}

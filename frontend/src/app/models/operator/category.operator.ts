import { OperatorFunction} from 'rxjs';
import { Categories } from '../category/category.module';
import { transformator } from './transformator';
import { CategoriesResponseModel, CategoriesResponse } from '../response/response.module';

export function transformCategories<T>(): OperatorFunction<any, any> {
  return transformator<CategoriesResponseModel, T>(Categories.buildFromCategoriesResponseModel, CategoriesResponse.isCategoriesResponseModel);
}
